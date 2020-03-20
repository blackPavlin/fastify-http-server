import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Vuelidate from "vuelidate";
import UiMini from "uimini/dist/css/uimini.min.css";

import router from "./router";
import store from "./store";

Vue.use(VueAxios, axios);
Vue.use(Vuelidate);
Vue.use(UiMini);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
