import client from "../../plugins/axios";

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem("token") || "",
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    clearToken(state) {
      state.token = "";
    },
  },
  actions: {
    async login({ commit }, payload) {
      const {
        data: { token },
      } = await client.post("/login", payload);
      localStorage.setItem("token", token);

      commit("setToken", token);
    },
    logout({ commit }) {
      commit("clearToken");
    },
  },
  getters: {
    isAuth: (state) => !!state.token,
    getToken: (state) => state.token,
  },
};
