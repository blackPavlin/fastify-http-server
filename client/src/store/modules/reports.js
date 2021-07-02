import client from "../../plugins/axios";

export default {
  namespaced: true,
  state: {
    reports: [],
  },
  mutations: {
    setReports: (state, reports) => (state.reports = reports),
  },
  actions: {
    async getReports({ commit }, periodID) {
      const {
        data: { reports },
      } = await client.get(`/report/${periodID}`);
      commit("setReports", reports);
    },
    async createReport({ dispatch }, payload) {
      await client.post("/report/create", payload);
      await dispatch("getReports", payload.periodID);
    },
    async deleteReport({ dispatch }, { periodID, reportID }) {
      await client.delete(`/report/${reportID}`);
      await dispatch("getReports", periodID);
    },
  },
  getters: {
    getReports: (state) => state.reports,
  },
};
