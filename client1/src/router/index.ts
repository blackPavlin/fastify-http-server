import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Main",
    component: () => import("../views/Main.vue"),
  },
  {
    path: "/reports",
    name: "Periods",
    component: () => import("../views/Periods.vue"),
  },
  {
    path: "/reports/:id",
    name: "Reports",
    component: () => import("../views/Reports.vue"),
  },
  {
    path: "/admin/login",
    name: "Login",
    component: () => import("../views/Admin/Login.vue"),
  },
  {
    path: "/admin/logout",
    name: "Logout",
    component: () => import("../views/Admin/Logout.vue"),
  },
  {
    path: "/admin/reports",
    name: "AdminPeriods",
    component: () => import("../views/Admin/Periods.vue"),
  },
  {
    path: "/admin/reports/:id",
    name: "AdminReports",
    component: () => import("../views/Admin/Reports.vue"),
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
