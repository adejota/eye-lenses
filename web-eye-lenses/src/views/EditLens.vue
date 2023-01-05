<template>
  <div class="p-4 flex flex-col items-center">
    <header class="flex justify-between items-center w-full mb-6">
      <div class="flex items-center">
        <Icon @click="$router.push('/home')" name="ArrowLeft" class="text-white w-6 h-6 mr-4 cursor-pointer"></Icon>
        <h1 class="text-white text-xl font-bold">Editar lente</h1>
      </div>

      <Icon @click="showOverlay = true" name="Trash" class="text-white w-6 h-6 cursor-pointer"></Icon>
    </header>

    <form @submit.prevent="submit" class="max-w-2xl">
      <label for="name" class="text-white w-full">Nome</label>
      <input
        v-model="name"
        type="text"
        :placeholder="loading ? 'Carregando...' : ''"
        class="w-full bg-full-black text-white focus:outline-none border border-low-black focus:border-primary p-2 pl-4 mt-2 mb-4 rounded"
      />

      <label for="duration" class="text-white w-full">Duração <span class="text-xs">(em dias)</span></label>
      <input
        v-model="duration"
        type="number"
        :placeholder="loading ? '...' : ''"
        min="1"
        class="w-full bg-full-black text-white focus:outline-none border border-low-black focus:border-primary p-2 pl-4 mt-2 mb-4 rounded"
      />

      <button type="submit"
        class="block w-full border text-primary py-2 px-4 rounded mt-2"
        :class="{ 'cursor-not-allowed text-low-black border border-low-black': submitting || loading }"
        :disabled="submitting || loading"
      >
        {{ submitting ? 'Salvando...' : 'Salvar' }}
      </button>
    </form>

    <Overlay :showOverlay="showOverlay"
      :showCancel="true"
      :buttons="overlayButtons"
      @handleShowOverlay="showOverlay = $event"
      @handleCbFunction="handleCbFunction($event)"
    />
  </div>
</template>

<script>
import Icon from "../components/Icon/index.vue";
import Overlay from '../components/Overlay.vue'

export default {
  name: "Form",

  components: { Icon, Overlay },

  data() {
    return {
      lensId: null,
      name: '',
      duration: null,
      submitting: false,
      deleting: false,
      loading: false,
      showOverlay: false,
      overlayButtons: [
        { name:'delete', text: 'Deletar', loadingText: 'Deletando...', color: 'error', callback: 'deleteLens', loading: false }
      ]
    };
  },

  async created() {
    this.loading = true
    this.lensId = this.$route.params.id

    try {
      const res = await this.$http.get(`/lens/${this.lensId}`)
      if (res) {
        this.name = res.data.lens[0].name
        this.duration = res.data.lens[0].duration
        this.loading = false
      }
    } catch (error) {
      console.log(error)
      this.loading = false
    }
  },

  methods: {
    handleCbFunction(e) {
      this[e]()
    },

    async submit() {
      this.submitting = true

      const payload = {
        id: this.lensId,
        name: this.name,
        duration: this.duration,
      }

      try {
        const res = await this.$http.put(`/lens`, payload)
        if (res) {
          this.$router.push('/home')
        }
      } catch (error) {
        console.log(error)
        this.submitting = false
      }
    },

    async deleteLens() {
      const index = this.overlayButtons.findIndex(i => i.name === 'delete')
      this.overlayButtons[index].loading = true

      try {
        const res = await this.$http.delete(`/lens/${this.lensId}`)
        if (res) {
          this.$router.push('/home')
        }
      } catch (error) {
        console.log(error)
        this.overlayButtons[index].loading = false
      }
    }
  }
};
</script>
