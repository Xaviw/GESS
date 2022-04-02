<template>
  <div id="toolbar-container" v-show="props.canEdit"></div>
  <div id="text-container"></div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, watchEffect, WatchStopHandle } from "vue";
import WangEditor from "wangeditor";

const props = defineProps<{ canEdit: boolean; data?: string }>();

let editor: any;
let t1: WatchStopHandle, t2: WatchStopHandle;

onMounted(() => {
  createEditor();
  t1 = watchEffect(() => {
    if (props.data) {
      editor?.txt.setJSON(JSON.parse(props.data));
    }
  });

  t2 = watchEffect(() => {
    if (props.canEdit) {
      editor?.enable();
    } else {
      editor?.disable();
    }
  });
});

const getJSON = () => editor?.txt.getJSON();
const getText = () => editor?.txt.text();

defineExpose({ getJSON, getText });

const createEditor = () => {
  editor?.destroy();
  const E = WangEditor;
  editor = new E("#toolbar-container", "#text-container");
  editor.config.uploadImgServer = "/article/uploadArticleImage";
  editor.config.zIndex = 1000;
  editor.create();
  editor.txt.clear();
};

onUnmounted(() => {
  editor?.destroy();
  t1();
  t2();
});
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
