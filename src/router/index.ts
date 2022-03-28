import { pendingRequests } from "./../request/index";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    title?: string;
    needLogin?: boolean;
    layout?: string;
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/views/index/Index.vue"),
    meta: {
      title: "首页",
    },
  },
  {
    path: "/login",
    component: () => import("@/views/login/Login.vue"),
    meta: {
      title: "注册/登录",
      layout: "blank",
    },
  },
  {
    path: "/personal",
    component: () => import("@views/personal/Personal.vue"),
    meta: {
      title: "个人中心",
      needLogin: true,
    },
  },
  {
    path: "/category",
    component: () => import("@views/category/Index.vue"),
  },
  {
    path: "/publish",
    component: () => import("@views/publish/Index.vue"),
  },
  {
    path: "/article/:id",
    component: () => import("@views/article/Index.vue"),
  },
  {
    path: "/forum",
    component: () => import("@views/forum/Index.vue"),
  },
];

// routes添加默认layout
routes.forEach((item) => {
  item.meta
    ? item.meta.layout
      ? null
      : (item.meta.layout = "basic")
    : (item.meta = { layout: "basic" });
});

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from) => {
  // 跳转路由前取消所有请求
  for (let item of pendingRequests) {
    item[1].cancel && item[1].cancel();
  }
  pendingRequests.clear();
});

router.afterEach((to, from) => {
  document.title = to.meta.title ?? import.meta.env.VITE_APP_TITLE;
});

export default router;
