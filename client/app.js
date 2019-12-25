import Vue from "vue"
import App from "./App.vue"
import Vuelidate from "vuelidate"
import UiMini from "uimini/dist/css/uimini.min.css"

import router from "./router"
import store from "./store"

Vue.use(
  Vuelidate,
  UiMini
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
