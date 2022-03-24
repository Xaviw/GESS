<template>
  <div class="max-area">
    <div class="flex-between">
      <h2>发布文章</h2>
      <a-button type="primary">发布</a-button>
    </div>
    <div style="margin-bottom: 20px">
      <span class="bold">
        标题：
        <a-input
          class="w300 inline-block"
          v-model:value="title"
          placeholder="请输入标题"
        />
      </span>
      <span class="bold" style="margin-left: 20px">
        相关标签：
        <a-select
          v-model:value="tags"
          class="w300 inline-block"
          mode="multiple"
          placeholder="请选择相关标签"
          :options="[]"
        ></a-select>
      </span>
    </div>

    <Editor :canEdit="true" />
  </div>
</template>

<script setup lang="ts">
import Editor from "@/components/Editor.vue";
import { ref } from "vue";

let title = ref("");
let tags = ref([]);
</script>

<style lang="less" scoped>
h2 {
  font-weight: bold;
  position: relative;
  margin: 30px 15px;
  &::before {
    content: "";
    position: absolute;
    left: -15px;
    width: 3px;
    height: 100%;
    background-color: #1890ff;
  }
}

.bold {
  font-weight: bold;
}
.w300 {
  width: 300px;
}
.inline-block {
  display: inline-block;
}
</style>
