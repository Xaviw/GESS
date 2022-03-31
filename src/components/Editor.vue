<template>
  <div id="toolbar-container" v-show="props.canEdit"></div>
  <div id="text-container"></div>
</template>

<script lang="ts" setup>
import { onMounted, watchEffect } from "vue";
import WangEditor from "wangeditor";

const props = defineProps<{ canEdit: boolean; data?: string }>();

let editor: any;

onMounted(() => {
  if (!editor) {
    const E = WangEditor;
    editor = new E("#toolbar-container", "#text-container");
    editor.config.uploadImgServer = "/article/uploadArticleImage";
    editor.config.zIndex = 1000;
    editor.create();
    watchEffect(() => {
      if (props.data) {
        editor.txt.setJSON(JSON.parse(props.data));
      }
    });

    watchEffect(() => {
      if (props.canEdit) {
        editor.enable();
      } else {
        editor.disable();
      }
    });
  }
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
