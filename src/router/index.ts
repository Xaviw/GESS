import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    title?: string;
    layout?: string;
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@views/index.vue"),
    meta: {
      title: "首页",
    },
  },
  {
    path: "/login",
    component: () => import("@views/login.vue"),
    meta: {
      title: "登录",
      layout: "blank",
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from) => {});

router.afterEach((to, from) => {
  document.title = to.meta.title ?? import.meta.env.VITE_APP_TITLE;
});

export default router;
