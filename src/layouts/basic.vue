<script setup lang="ts">
import { ref } from "vue";
import {
  UserOutlined,
  BellOutlined,
  MenuOutlined,
} from "@ant-design/icons-vue";

const appTitle = import.meta.env.VITE_APP_TITLE;
const menu = [
  {
    key: "zt",
    title: "真题区",
    children: [
      { key: "kyzt", title: "考研真题" },
      { key: "fszt", title: "复试真题" },
    ],
  },
  {
    key: "zy",
    title: "资源区",
    children: [
      { key: "zxzy", title: "最新资源" },
      { key: "fszy", title: "复试资源" },
    ],
  },
  {
    key: "bj",
    title: "笔记区",
    children: [
      { key: "zzgh", title: "政治干货" },
      { key: "sxgh", title: "数学干货" },
      { key: "yygh", title: "英语干货" },
      { key: "qtbj", title: "其他笔记" },
    ],
  },
  {
    key: "yx",
    title: "院校区",
    children: [
      { key: "tkzy", title: "统考资源" },
      { key: "lqsj", title: "录取数据" },
      { key: "fsx", title: "分数线" },
    ],
  },
  {
    key: "bz",
    title: "帮助区",
    children: [
      { key: "cjwt", title: "常见问题" },
      { key: "zxwd", title: "在线问答" },
      { key: "dksa", title: "打卡上岸" },
    ],
  },
];
let searchValue = ref("");

let sideDrawerVisible = ref(false);

window.addEventListener("scroll", (e) => {
  console.log(e);
});
</script>

<template>
  <div>
    <div
      class="
        top-bg
        bg-center bg-no-repeat bg-cover
        h-400px
        flex flex-col
        items-center
      "
    >
      <div class="max-area flex justify-between align-middle py-4">
        <span class="text-light-200 text-2xl font-bold text-shadow-xl">{{
          appTitle
        }}</span>
        <div
          class="flex flex-nowrap text-light-50 items-center <small:(hidden)"
        >
          <a-dropdown v-for="item of menu" class="px-8">
            <span
              @click.prevent
              class="text-lg font-medium cursor-pointer text-shadow-lg"
            >
              {{ item.title }}
              <DownOutlined />
            </span>
            <template #overlay v-if="item.children.length">
              <a-menu>
                <a-menu-item v-for="sub of item.children">
                  <span>{{ sub.title }}</span>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
        <div class="flex items-center">
          <button
            class="
              rounded-2xl
              text-light-50
              border-solid border-light-50 border-2
              px-4
              py-1
              bg-opacity-0
              outline-none
              text-shadow-sm
              hover:(text-[#1dc9b7])
              focus:(outline-none
              hover:text-light-50)
            "
          >
            <user-outlined />登录
          </button>
          <menu-outlined
            class="!text-light-50 text-2xl ml-8 !hidden <small:(!block)"
            @click="sideDrawerVisible = true"
          />
        </div>
      </div>
      <span
        class="
          text-3xl
          font-semibold
          tracking-0.3em
          text-light-50
          pt-12
          <mobile:(text-2xl)
        "
        >搜索本站精品学习资源</span
      >
      <span class="text-light-50 py-4"
        >多个关键词用空格隔开 搜索结果更准确</span
      >
      <div
        class="
          flex
          p-2
          bg-light-50 bg-opacity-10
          rounded
          w-[90%]
          max-w-xl
          <mobile:(flex-wrap
          mt-8)
        "
      >
        <a-input
          v-model:value="searchValue"
          placeholder="请输入关键字搜索..."
          size="large"
          class="!mr-4 w-[70%] <mobile:(w-full !mr-0 !mb-4)"
        />
        <a-button type="primary" size="large" class="w-[20%] <mobile:(w-full)"
          >搜索</a-button
        >
      </div>
      <div
        class="
          inline-flex
          justify-evenly
          items-center
          bg-light-blue-700
          rounded-4xl
          text-light-50
          px-8
          py-2
          mt-12
          <small:(!hidden)
        "
      >
        <span class="bg-yellow-400 px-2 mx-4 rounded-2xl">
          <bell-outlined />平台统计
        </span>
        <span class="mx-4">会员总数：14970</span>
        <span class="mx-4">今日发布：2</span>
        <span class="mx-4">本周发布：774</span>
        <span class="mx-4">资源总数：113356</span>
      </div>
    </div>
    <div class="max-area h-7xl">
      <router-view></router-view>
    </div>
    <div class="max-area"></div>
  </div>

  <a-drawer v-model:visible="sideDrawerVisible" width="300px" placement="right">
    <a-menu style="width: 100%" mode="inline">
      <a-sub-menu :key="item.key" v-for="item of menu">
        <template #title>{{ item.title }}</template>
        <a-menu-item :key="sub.key" v-for="sub of item.children">{{
          sub.title
        }}</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-drawer>
</template>

<style>
.ant-dropdown-menu-title-content {
  text-align: center;
  padding: 0.25rem 0;
}
.ant-menu-inline,
.ant-menu-vertical,
.ant-menu-vertical-left {
  border-right: none;
}
</style>
