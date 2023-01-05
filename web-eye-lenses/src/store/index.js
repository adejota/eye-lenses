import Vuex from 'vuex'
import jwt_decode from "jwt-decode"
import createPersistedState from "vuex-persistedstate"
import SecureLS from "secure-ls"
const ls = new SecureLS({ isCompression: false })

const initialState = () => {
  return {
    accessToken: null,
    userId: '',
    exp: null,
  }
}

const state = initialState()

const getters = {
  isAuthenticated(state) {
    return !!state.accessToken
  }
}

const mutations = {
  setAccessToken(state, payload) {
    state.accessToken = payload
  },

  setUserId(state, payload) {
    state.userId = payload
  },

  setTokenExp(state, payload) {
    state.exp = payload
  },

  resetState(state) {
    Object.assign(state, initialState())
  },
}

const actions = {
  async authenticate({ commit }, token) {
    if (token) {
      await commit('setAccessToken', token)
      const decoded = jwt_decode(token)
      await commit('setUserId', decoded.id)
      await commit('setTokenExp', decoded.exp)
      return 'success'
    } else {
      return 'error'
    }
  },
}

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    })
  ],
  state,
  getters,
  mutations,
  actions
})
