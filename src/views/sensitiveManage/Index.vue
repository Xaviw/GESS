<template>
  <div class="max-area">
    <div class="flex-between">
      <div>
        <h2 style="margin-top: 20px; font-weight: bold">敏感词汇表</h2>
        <p>编辑词汇表，请用一个或多个空格分隔</p>
      </div>
      <a-button type="primary">保存</a-button>
    </div>
    <a-textarea v-model:value="value" placeholder="请输入" :rows="8" />
  </div>
</template>

<script setup lang="ts">
import { getSensitiveWords } from "@/request/apis";
import { ref } from "vue";

const value = ref<string>("");

getSensitiveWords().then(([res]) => {
  let words = "";
  res.forEach((item) => {
    words += `${item.word} `;
  });
  value.value = words;
});
</script>

<style scoped lang="less"></style>
