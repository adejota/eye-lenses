<template>
  <div class="p-4 flex flex-col items-center">
    <header class="flex justify-between items-center w-full mb-6">
      <h1 class="text-white text-xl font-bold">Lentes</h1>
      <Icon @click="logout()" name="Logout" class="text-white w-6 h-6 cursor-pointer"></Icon>
    </header>

    <section class="w-full max-w-2xl">
      <div class="w-full flex items-center">
        <h2 class="text-white text-lg mr-4">Minhas lentes</h2>
        <Icon @click="showOverlay = !showOverlay" name="AdjustmentsHorizontal" class="text-white w-6 h-6 cursor-pointer"></Icon>
      </div>

      <ul v-if="lensesList.length && !loading"
        class="my-4"
      >
        <li v-for="(lens, index) in lensesList" :key="lens.id"
          @click="$router.push(`edit-lens/${lens.id}`)"
          class="flex p-2 lg:px-4 my-2 group hover:bg-low-black transition-colors cursor-pointer rounded" 
        >
          <div
            class="flex flex-col items-center justify-center mr-4 border border-low-black transition-all p-2 rounded"
            :class="calcRemainingDays(lens) >= 0 ? 'group-hover:border-primary' : 'group-hover:border-error'"
          >
            <span class="text-white text-xs">{{ setExpiredDate(lens).day }}</span>
            <span class="text-white text-xs">{{ setMonthText(setExpiredDate(lens).month) }}</span>
          </div>

          <div class="w-full flex justify-between items-center">
            <div class="flex flex-col">
              <span class="text-white">{{ lens.name }}</span>
              <span class="text-mid-white">{{ setRemainingText(lens) }}</span>
              <span class="text-low-white text-xs">{{`Criada em ${formatCreatedAt(lens)}`}}</span>
            </div>

            <Icon name="ArrowRight" class="text-white w-4 h-4 cursor-pointer transition-all"
              :class="calcRemainingDays(lens) >= 0 ? 'group-hover:text-primary' : 'group-hover:text-error'"
            ></Icon>
          </div>
        </li>

        <div v-if="showExpired ? listLength < lenses.length : listLength < unexpiredLenses.length"
          class="w-full flex justify-center"
        >
          <button @click="listLength += 3" class="block text-primary text-sm">
            Mostrar mais
          </button>
        </div>
      </ul>

      <div v-else-if="!lensesList.length && !loading"
        class="my-4"
      >
        <p class="text-mid-white">Nenhuma lente em uso</p>
      </div>

      <div v-else
        class="my-4"
      >
        <p class="text-mid-white">Carregando lentes...</p>
      </div>

      <div class="w-full border bg-low-black border-low-black mt-4 mb-8"></div>

      <button @click="$router.push('/new-lens')"
        class="block w-full border border-primary text-primary py-2 px-4 rounded"
      >
        Adicionar lente
      </button>
    </section>

    <Overlay :showOverlay="showOverlay"
      :showCancel="true"
      :buttons="overlayButtons"
      @handleShowOverlay="showOverlay = $event"
      @handleCbFunction="handleCbFunction($event)"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Icon from "../components/Icon/index.vue";
import Overlay from '../components/Overlay.vue'

export default {
  name: "Home",

  components: {
    Icon,
    Overlay
  },

  data() {
    return {
      loading: false,
      lenses: [],
      listLength: 3,
      showExpired: false,
      showOverlay: false,
      overlayButtons: [
        { name:'show-expired', text: 'Mostrar lentes expiradas', color: 'primary', callback: 'toggleShowExpired'}
      ]
    };
  },

  computed: {
    ...mapState(['userId']),

    unexpiredLenses() {
      if (!this.lenses.length) {
        return []
      }

      return this.lenses.filter(i => this.calcRemainingDays(i) >= 0)
    },

    lensesList() {
      if (!this.lenses.length) {
        return []
      }

      if (this.showExpired) {
        return this.lenses.slice(0, this.listLength)
      } else {
        return this.unexpiredLenses.slice(0, this.listLength)
      }
    }
  },

  async created() {
    this.loading = true

    if (this.userId) {
      try {
        const res = await this.$http.get(`/user-lens/${this.userId}`)
        if (res) {
          this.lenses = res.data.lenses
          this.loading = false
        }
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    } else {
      this.loading = false
      console.log('ID do usuário não informado')
    }
  },

  methods: {
    ...mapMutations(['resetState']),

    handleCbFunction(e) {
      this[e]()
    },

    toggleShowExpired() {
      this.showExpired = !this.showExpired

      const index = this.overlayButtons.findIndex(i => i.name === 'show-expired')

      if (this.showExpired) {
        this.overlayButtons[index].text = 'Ocultar lentes expiradas'
      } else {
        this.overlayButtons[index].text = 'Mostrar lentes expiradas'
      }

      this.showOverlay = false
    },

    setExpiredDate(lens) {
      const createdAtInSec = new Date(lens.created_at).getTime() / 1000
      const durationInSec = 60 * 60 * 24 * lens.duration
      const expiredDateInSec = createdAtInSec + durationInSec
      const expiredDate = new Date(expiredDateInSec * 1000)
      const day = expiredDate.getDate()
      const month = expiredDate.getMonth() + 1

      return {
        day,
        month
      }
    },

    calcRemainingDays(lens) {
      const createdAtInSec = new Date(lens.created_at).getTime() / 1000
      const todayInSec = Math.floor(Date.now() / 1000)
      const durationInSec = 60 * 60 * 24 * lens.duration
      const expiredDateInSec = createdAtInSec + durationInSec
      const remainingDays = Math.ceil((expiredDateInSec - todayInSec) / (60 * 60 * 24))
      
      return remainingDays
    },

    setRemainingText(lens) {
      const remainingDays = this.calcRemainingDays(lens)

      if (remainingDays > 1) {
        return `${remainingDays} dias restantes`
      } else if (remainingDays === 1) {
        return `${remainingDays} dia restante`
      } else if (remainingDays === 0) {
        return 'Último dia'
      } else if (remainingDays === -1) {
        return `Expirou há ${remainingDays} dia`
      } else {
        return `Expirou há ${remainingDays * -1} dias`
      }
    },

    formatCreatedAt(lens) {
      const createdAt = new Date(lens.created_at);
      const day = createdAt.getDate()
      const month = createdAt.getMonth() + 1
      const year = createdAt.getFullYear()

      return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`
    },

    setMonthText(month) {
      if (month === 1) {
        return 'jan'
      } else if (month === 2) {
        return 'fev'
      } else if (month === 3) {
        return 'mar'
      } else if (month === 4) {
        return 'abr'
      } else if (month === 5) {
        return 'mai'
      } else if (month === 6) {
        return 'jun'
      } else if (month === 7) {
        return 'jul'
      } else if (month === 8) {
        return 'ago'
      } else if (month === 9) {
        return 'set'
      } else if (month === 10) {
        return 'out'
      } else if (month === 11) {
        return 'nov'
      } else if (month === 12) {
        return 'dez'
      }
    },

    logout() {
      this.resetState()
      this.$router.push('/')
    }
  }
};
</script>
