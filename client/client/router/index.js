import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/store";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Main",
        component: () => import("../views/Main.vue"),
        meta: {
            title: "Main",
        },
    }, {
        path: "/login",
        name: "Login",
        component: () => import("../views/Login.vue"),
        meta: {
            title: "Login",
        },
    }, {
        path: "/registration",
        name: "Registration",
        component: () => import("../views/Registration.vue"),
        meta: {
            title: "Registration",
        },
    }, {
        path: "/home",
        name: "Home",
        component: () => import("../views/Home.vue"),
        meta: {
            title: "Home",
            requiresAuth: true,
        },
    }, {
        path: "/logout",
        name: "Logout",
        component: () => import("../views/Logout.vue"),
        meta: {
            title: "Logout",
            requiresAuth: true,
        },
    },
];

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
        next();
    }
});

export default router;
