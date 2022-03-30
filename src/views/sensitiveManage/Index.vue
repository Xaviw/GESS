<template>
  <div class="max-area">
    <div class="flex-between">
      <div>
        <h2 style="margin-top: 20px; font-weight: bold">敏感词汇表</h2>
        <p>编辑词汇表，请用逗号分隔</p>
      </div>
      <a-button type="primary" @click="save">保存</a-button>
    </div>
    <a-textarea v-model:value="value" placeholder="请输入" :rows="8" />
  </div>
</template>

<script setup lang="ts">
import { getSensitiveWords, editSensitiveWords } from "@/request/apis";
import { ref } from "vue";

const value = ref<string>("");

getSensitiveWords().then(([res]) => {
  value.value = res;
});

const save = () => {
  let words = value.value.replaceAll("，", ",");
  editSensitiveWords(words);
};
</script>

<style scoped lang="less"></style>
