export default {
  state: {
      token: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    clearToken(state) {
      state.token = null
    },
  },
  actions: {
    async login({ commit, dispatch }, formData) {
      try {
        const { data: { token }} = await this._vm.axios.post('http://localhost:3000/login', formData);
        commit('setToken', token);
      } catch(error) {
        console.error(error);
      }
    },
    async signup({ commit, dispatch }, formData) {
      try {
        await this._vm.axios.post('http://localhost:3000/signup', formData);
        dispatch("login", formData);
      } catch(error) {
        console.error(error);
      }
    }
  },
  getters: {

  }
}
