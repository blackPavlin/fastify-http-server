import "@babel/polyfill"
import Vue from "vue"
import app from "./index.vue"

new Vue({
    el: "#app",
    render: h => h(app),
})
