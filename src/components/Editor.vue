<template>
  <div id="toolbar-container" v-show="canEdit"></div>
  <div id="text-container"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import WangEditor from "wangeditor";

defineProps<{ canEdit: boolean; data?: string }>();

let editor: any;

onMounted(() => {
  const E = WangEditor;
  editor = new E("#toolbar-container", "#text-container");
  editor.config.uploadImgServer = "/article/uploadArticleImage";
  editor.create();
});

const getJSON = () => editor.txt.getJSON();

defineExpose({ getJSON });
</script>

<style scoped lang="less">
#toolbar-container {
  border: 1px solid #eee;
  border-bottom: none;
}

#text-container {
  border: 1px solid #eee;
  min-height: 300px;
}
</style>
