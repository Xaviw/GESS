<template>
  <div class="max-area">
    <a-tabs tab-position="left" class="container">
      <a-tab-pane key="1" tab="个人资料"><Profile /></a-tab-pane>
      <a-tab-pane key="2" tab="我的文章"><MyArticle /></a-tab-pane>
      <a-tab-pane key="3" tab="修改密码"><ModifyPwd /></a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import Profile from "./Profile.vue";
import ModifyPwd from "./modifyPwd.vue";
import MyArticle from "./myArticle.vue";
</script>

<style scoped lang="less">
.container {
  margin: 40px 0;
}
</style>
