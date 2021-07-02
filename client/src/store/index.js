import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";
import periods from "./modules/periods";
import reports from "./modules/reports";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    periods,
    reports,
  },
});
