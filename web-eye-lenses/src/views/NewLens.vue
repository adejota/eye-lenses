<template>
  <div class="p-4 flex flex-col items-center">
    <header class="flex justify-start items-center w-full mb-6">
      <Icon @click="$router.push('/home')" name="ArrowLeft" class="text-white w-6 h-6 mr-4 cursor-pointer"></Icon>
      <h1 class="text-white text-xl font-bold">Nova lente</h1>
    </header>

    <form @submit.prevent="submit" class="max-w-2xl">
      <label for="name" class="text-white w-full">Nome</label>
      <input
        v-model="name"
        type="text"
        class="w-full bg-full-black text-white focus:outline-none border border-low-black focus:border-primary p-2 pl-4 mt-2 mb-4 rounded"
      />

      <label for="duration" class="text-white w-full">Duração <span class="text-xs">(em dias)</span></label>
      <input
        v-model="duration"
        type="number"
        class="w-full bg-full-black text-white focus:outline-none border border-low-black focus:border-primary p-2 pl-4 mt-2 mb-4 rounded"
      />

      <button type="submit"
        class="block w-full border text-primary py-2 px-4 rounded mt-2"
        :class="{ 'cursor-not-allowed text-low-black border border-low-black': submitting }"
        :disabled="submitting"
      >
        {{ submitting ? 'Salvando...' : 'Salvar' }}
      </button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Icon from "../components/Icon/index.vue";

export default {
  name: "Form",

  components: { Icon },

  data() {
    return {
      name: '',
      duration: 30,
      submitting: false,
    };
  },

  computed: {
    ...mapState(['userId'])
  },

  methods: {
    async submit() {
      this.submitting = true

      if (this.userId) {
        const payload = {
          name: this.name,
          duration: this.duration,
          id_user: this.userId
        }

        try {
          const res = await this.$http.post(`/lens`, payload)
          if (res) {
            this.$router.push('/home')
          }
        } catch (error) {
          console.log(error)
          this.submitting = false
        }
      } else {
        this.submitting = false
        console.log('ID do usuário não informado')
      }
    }
  }
};
</script>
