<script setup lang="ts">
import { ref } from "vue";
import { UserOutlined } from "@ant-design/icons-vue";

const appTitle = import.meta.env.VITE_APP_TITLE;
const menu = [
  { title: "真题区", children: [{ title: "考研真题" }, { title: "复试真题" }] },
  { title: "资源区", children: [{ title: "最新资源" }, { title: "复试资源" }] },
  {
    title: "笔记区",
    children: [
      { title: "政治干货" },
      { title: "数学干货" },
      { title: "英语干货" },
      { title: "其他笔记" },
    ],
  },
  {
    title: "院校区",
    children: [
      { title: "统考资源" },
      { title: "录取数据" },
      { title: "分数线" },
    ],
  },
  {
    title: "帮助区",
    children: [
      { title: "常见问题" },
      { title: "在线问答" },
      { title: "打卡上岸" },
    ],
  },
];
</script>

<template>
  <div class="max-w-6xl mx-auto">
    <div class="top-bg bg-center bg-no-repeat bg-cover h-400px">
      <div class="flex justify-between align-middle px-8 py-4">
        <span class="text-light-200 text-2xl font-bold text-shadow-xl">{{
          appTitle
        }}</span>
        <div class="flex flex-nowrap text-light-50">
          <a-dropdown v-for="item of menu" class="px-8">
            <span @click.prevent class="text-lg font-medium align-bottom">
              {{ item.title }}
              <DownOutlined />
            </span>
            <template #overlay v-if="item.children.length">
              <a-menu>
                <a-menu-item v-for="sub of item.children">
                  <span class="">{{ sub.title }}</span>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
        <button
          class="
            rounded-2xl
            text-light-50
            border-solid border-light-50 border-2
            px-4
            py-1
            bg-opacity-0
            hover:(text-green-700)
          "
        >
          <user-outlined />登录
        </button>
      </div>
    </div>
    <div>
      <router-view></router-view>
    </div>
    <div></div>
  </div>
</template>

<style>
.top-bg {
  background-image: url("@/assets/top.jpg");
}
</style>
