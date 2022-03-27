<template>
  <div class="max-area">
    <div class="flex-between">
      <h2>发布文章</h2>
      <a-button type="primary" @click="publish">发布</a-button>
    </div>
    <div class="flex-between" style="margin-bottom: 20px">
      <div>
        <p class="bold">
          标题：&emsp;&emsp;
          <a-input
            class="w300 inline-block"
            v-model:value="title"
            placeholder="请输入标题"
          />
        </p>
        <p class="bold">
          相关标签：
          <a-select
            v-model:value="tags"
            class="w300 inline-block"
            mode="multiple"
            placeholder="请选择相关标签"
            :options="[]"
          ></a-select>
        </p>
      </div>
      <div style="display: flex; flex-direction: column; align-items: flex-end">
        <a-upload
          v-model:file-list="fileList"
          :customRequest="uploadFile"
          :beforeUpload="beforeUpload"
          :showUploadList="false"
        >
          <a-button>
            <upload-outlined></upload-outlined>
            上传附件
          </a-button>
        </a-upload>
        <span>{{ fileList[0]?.name }}</span>
      </div>
    </div>

    <Editor :canEdit="true" ref="editorEl" />
  </div>
</template>

<script setup lang="ts">
import Editor from "@/components/Editor.vue";
import { ref } from "vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";

const editorEl = ref<any>(null);
let title = ref("");
let tags = ref([]);
let fileList = ref<any[]>([]);
let formData = new FormData();

const beforeUpload = (file: any) => {
  if (file.size > 1024 * 1024 * 100) {
    message.warn("单个文件不得大于100MB！");
    return false;
  }
  return true;
};
const uploadFile = (file: any) => {
  formData.append("file", file.file);
};

const publish = () => {
  if (!title.value) {
    message.error("请填写标题！");
    return;
  }
  if (!tags.value.length) {
    message.error("请选择相关标签！");
    return;
  }
  const content = editorEl.value.getJSON();
  if (!content) {
    message.error("请输入正文！");
    return;
  }
  formData.append("title", title.value);
  formData.append("tags", JSON.stringify(tags.value));
  formData.append("content", JSON.stringify(content));
};
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
