import $http from '../../plugins/axios';

export default {
  namespaced: true,
  state: {
    token: '',
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    clearToken(state) {
      state.token = '';
    },
  },
  actions: {
    async login({ commit, dispatch }, formData) {
      try {
        const { data: { token }} = await $http.post('/login', formData);
        commit('setToken', token);
      } catch(error) {
        console.error(error);
        throw error
      }
    },
    async signup({ commit, dispatch }, formData) {
      try {
        await $http.post('/signup', formData);
        dispatch('login', formData);
      } catch(error) {
        console.error(error);
        throw error
      }
    },
    logout({ commit }) {
      commit('clearToken');
    },
  },
  getters: {
    isAuth: state => !!state.token,
    getToken: state => state.token,
  }
}
