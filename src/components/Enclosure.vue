<template>
  <h3>附件：</h3>
  <a-typography-text type="secondary" v-if="!file">无附件...</a-typography-text>
  <template v-else>
    <a-button :href="file" type="primary" @click="downloadArticle(id)"
      >下载附件</a-button
    >
    <a-button
      :href="`/article/viewsFileById?id=${id}`"
      target="blank"
      style="margin-left: 15px"
      >预览</a-button
    >
  </template>
</template>

<script lang="ts" setup>
import { downloadArticle } from "@apis/apis";

defineProps<{ file: string; id: string }>();
</script>

<style lang="less" scoped>
h3 {
  margin: 20px 0;
  font-weight: bold;
  font-size: 1.2rem;
}
</style>
