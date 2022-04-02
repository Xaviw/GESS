<template>
  <div class="max-area">
    <a-tabs tab-position="left" class="container">
      <a-tab-pane key="1" tab="个人资料"><Profile /></a-tab-pane>
      <a-tab-pane key="2" tab="我的文章"><MyArticle /></a-tab-pane>
      <a-tab-pane key="3" tab="我的下载"><MyDownload /></a-tab-pane>
      <a-tab-pane key="4" tab="我的公告"><MyNotice /></a-tab-pane>
      <a-tab-pane key="5" tab="修改密码"><ModifyPwd /></a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import Profile from "./Profile.vue";
import ModifyPwd from "./modifyPwd.vue";
import MyArticle from "./myArticle.vue";
import { computed } from "vue";
import store from "@/store";
import { ROLE } from "@/types/common";
import MyNotice from "./myNotice.vue";
import MyDownload from "./myDownload.vue";

const isAdmin = computed(() => store.state.role !== ROLE.user);
</script>

<style scoped lang="less">
.container {
  margin: 40px 0;
}
</style>
