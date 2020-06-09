import client from '../../plugins/axios';

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('token') || '',
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
    async logIn({ commit, dispatch }, formData) {
      const { data: { token }} = await client.post('/login', formData);
      localStorage.setItem('token', token);
      commit('setToken', token);
    },
    async signUp({ commit, dispatch }, formData) {
      await client.post('/signup', formData);
      dispatch('logIn', formData);
    },
    logOut({ commit }) {
      localStorage.removeItem('token');
      commit('clearToken');
    },
  },
  getters: {
    isAuth: state => !!state.token,
    getToken: state => state.token,
  }
}
