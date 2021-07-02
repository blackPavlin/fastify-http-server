import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/reports",
    name: "Periods",
    component: () => import("@/views/Periods.vue"),
  },
  {
    path: "/reports/:id",
    name: "Reports",
    component: () => import("@/views/Reports.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("@/views/admin/Admin.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/admin/reports",
    name: "AdminPeriods",
    component: () => import("@/views/admin/Periods.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/admin/reports/:id",
    name: "AdminReports",
    component: () => import("@/views/admin/Reports.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/admin/login",
    name: "AdminLogin",
    component: () => import("@/views/admin/Login.vue"),
  },
  {
    path: "/admin/logout",
    name: "AdminLogout",
    component: () => import("@/views/admin/Logout.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/admin/payments",
    name: "AdminPayments",
    component: () => import("@/views/admin/Payments.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters["auth/isAuth"]) {
      next();
    } else {
      next({
        path: "/admin/login",
      });
    }
  } else {
    next();
  }
});

export default router;
