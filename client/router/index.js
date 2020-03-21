import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/store";

import Main from "../views/Main.vue";
import Login from "../views/Login.vue";
import Registration from "../views/Registration.vue";
import Home from "../views/Home.vue";
import Logout from "../views/Logout.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "Main",
        component: Main,
        meta: {
            title: "Main",
        },
    }, {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            title: "Login",
        },
    }, {
        path: "/registration",
        name: "Registration",
        component: Registration,
        meta: {
            title: "Registration",
        },
    }, {
        path: "/home",
        name: "Home",
        component: Home,
        meta: {
            title: "Home",
            requiresAuth: true,
        },
    }, {
        path: "/logout",
        name: "Logout",
        component: Logout,
        meta: {
            title: "Logout",
            requiresAuth: true,
        },
    },
]

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters["auth/isAuth"]) {
            next();
        } else {
            next({
                path: "/login",
                query: { message: "login" },
            });
        }
    } else {
        next()
    }
})

export default router;
