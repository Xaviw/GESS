<template>
  <h3>附件：</h3>
  <a-typography-text type="secondary" v-if="!file">无附件...</a-typography-text>
  <a-button :href="file" v-else>下载附件</a-button>
</template>

<script lang="ts" setup>
defineProps<{ file: string }>();
</script>

<style lang="less" scoped>
h3 {
  margin: 20px 0;
  font-weight: bold;
  font-size: 1.2rem;
}
</style>
