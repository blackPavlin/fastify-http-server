import client from "../../plugins/axios";

export default {
  namespaced: true,
  state: {
    periods: [],
  },
  mutations: {
    setPeriods: (state, periods) => (state.periods = periods),
  },
  actions: {
    async getPeriods({ commit }) {
      const {
        data: { periods },
      } = await client.get("/period");
      commit("setPeriods", periods);
    },
    async createPeriod({ dispatch }, payload) {
      await client.post("/period/create", payload);
      await dispatch("getPeriods");
    },
    async deletePeriod({ dispatch }, periodID) {
      await client.delete(`/period/${periodID}`);
      await dispatch("getPeriods");
    },
  },
  getters: {
    getPeriods: (state) => state.periods,
  },
};
