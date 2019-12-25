import Vue from "vue"
import VueRouter from "vue-router"

import Home from "../views/Home.vue"
import Login from "../views/Login.vue"
import Registration from "../views/Registration.vue"

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            title: "Home",
            metaTags: [
                {
                    name: "description",
                    content: ""
                }
            ]
        },
    }, {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            title: "Login",
            metaTags: [
                {
                    name: "description",
                    content: ""
                }
            ]
        },
    }, {
        path: "/registration",
        name: "Registration",
        component: Registration,
        meta: {
            title: "Registration",
            metaTags: [
                {
                    name: "description",
                    content: ""
                }
            ]
        },
    },
]

const router = new VueRouter({
//   mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
