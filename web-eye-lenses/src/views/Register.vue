<template>
  <div
    class="min-h-screen h-full min-w-screen w-full flex flex-col justify-center items-center p-4"
  >
    <div
      class="w-full max-w-2xl border border-low-black rounded p-4 flex flex-col justify-center items-center"
    >
      <h1 class="text-xl text-white mb-4">Nova conta</h1>

      <label for="email" class="text-white w-full">E-mail</label>
      <input
        v-model="email"
        type="email"
        required
        @blur="validate('email')"
        @focus="clearError('email')"
        :class="emailErrorMsg ? 'mb-1 border-error' : 'mb-4'"
        class="w-full bg-full-black text-white focus:outline-none border border-low-black focus:border-primary p-2 pl-4 mt-2 rounded"
      />
      <p v-if="emailErrorMsg" 
        class="m-0 p-0 mb-4 w-full text-error text-sm"
      >
        {{ emailErrorMsg }}
      </p>

      <label for="password" class="text-white w-full">Senha</label>
      <div class="w-full flex justify-between mt-2 border border-low-black focus-within:border-primary rounded"
        :class="passwordErrorMsg ? 'mb-1 border-error' : 'mb-4'"
      >
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          required
          @blur="validate('password')"
          @focus="clearError('password')"
          class="w-full bg-full-black text-white focus:outline-none p-2 pl-4 rounded"
        />

        <button
          @click="showPassword = !showPassword"
          class="text-white text-xs px-4"
        >
          {{ showPassword ? 'Ocultar' : 'Mostrar' }}
        </button>
      </div>
      <p v-if="passwordErrorMsg" 
        class="m-0 p-0 mb-4 w-full text-error text-sm"
      >
        {{ passwordErrorMsg }}
      </p>

      <button
        @click="register()"
        class="block w-full border text-primary py-2 px-4 rounded mt-4"
        :class="{ 'cursor-not-allowed text-low-black border border-low-black': loading }"
        :disabled="loading"
      >
        {{ loading ? 'Criando...' : 'Criar' }}
      </button>

      <button @click="$router.push('/')"
        class="block w-full text-primary py-2 mt-2"
      >
        Voltar
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "Register",

  data() {
    return {
      email: '',
      emailErrorMsg: '',
      password: '',
      passwordErrorMsg: '',
      showPassword: false,
      loading: false,
    };
  },

  methods: {
    ...mapActions(['authenticate']),

    validate(input) {
      if (input === 'email') {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const valid = emailRegex.test(this.email)
        if (!valid) {
          this.emailErrorMsg = 'E-mail inválido'
        }
      }

      if (input === 'password') {
        if (this.password.length < 6) this.passwordErrorMsg = 'A senha deve conter no mínimo 6 caracteres'
      }
    },

    clearError(input) {
      if (input === 'email') {
        if (this.emailErrorMsg.length) this.emailErrorMsg = ''
      }

      if (input === 'password') {
        if (this.passwordErrorMsg.length) this.passwordErrorMsg = ''
      }
    },

    async register() {
      if (this.emailErrorMsg.length || this.passwordErrorMsg.length) {
        return
      }

      this.loading = true

      const payload = {
        email: this.email,
        password: this.password
      }

      try {
        const res = await this.$http.post('/user', payload)
        if (res) {
          if (res.data.user) {
            const login = await this.$http.post('/auth', payload)
              if (login.data.token) {
                const auth = await this.authenticate(login.data.token)
                if (auth === 'success') {
                  this.$router.push('/home')
                } else {
                  this.loading = false
                  console.log('Erro ao salvar informações do token')
                }
              }
          } else {
            this.loading = false
            console.log('Erro ao criar usuário')
          }
        }
      } catch (error) {
        this.loading = false
        console.log(error.response.data)
      }
    }
  }
};
</script>
