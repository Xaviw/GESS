<script setup lang="ts">
import { ref } from "vue";
import {
  UserOutlined,
  BellOutlined,
  MenuOutlined,
} from "@ant-design/icons-vue";
import menu from "@/assets/menu";

const appTitle = import.meta.env.VITE_APP_TITLE;

let searchValue = ref("");

let sideDrawerVisible = ref(false);

let last_known_scroll_position = 0;
let ticking = false;

function doSomething(scroll_pos: any) {
  console.log("scroll_pos: ", scroll_pos);
  // 根据滚动位置做的事
}

window.addEventListener("scroll", function (e) {
  last_known_scroll_position = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function () {
      doSomething(last_known_scroll_position);
      ticking = false;
    });

    ticking = true;
  }
});
</script>

<template>
  <div class="scroll-container min-h-full flex flex-col justify-between">
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
    <div class="max-area flex-grow h-7xl">
      <router-view></router-view>
    </div>
    <div
      class="bg-blue-gray-600 text-center text-light-50 tracking-widest py-4"
    >
      - 考研分享平台 -
    </div>
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
