<template>
  <div class="max-area">
    <div class="flex-between">
      <h2>发布{{ isInfo ? "信息" : "文章" }}</h2>
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
            :options="tagOptions"
            v-if="!isInfo"
          ></a-select>
          <a-select
            v-model:value="tags"
            class="w300 inline-block"
            placeholder="请选择相关标签"
            :options="infoOptions"
            v-else
          ></a-select>
        </p>
      </div>
      <div
        style="display: flex; flex-direction: column; align-items: flex-end"
        v-if="!isInfo"
      >
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

    <Editor :canEdit="true" :data="data" ref="editorEl" />
  </div>
</template>

<script setup lang="ts">
import Editor from "@/components/Editor.vue";
import { computed, ref, watchEffect } from "vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { getArticleDetail, uploadArticle, addNotice } from "@/request/apis";
import { myStore } from "@/store";
import { useRoute, useRouter } from "vue-router";
import { watch } from "vue";
import { ROLE } from "@/types/common";

const router = useRouter();
const route = useRoute();

let isInfo = computed(() => route.fullPath.includes("info"));

let data = ref();
watchEffect(() => {
  if (route.query.id) {
    getArticleDetail(route.query.id as string).then(([res]) => {
      data.value = res.content;
      title.value = res.title;
      tags.value = res.tags.map((item) => item.id);
    });
  }
});

const editorEl = ref<any>(null);
let title = ref("");

const store = myStore();
let tags = ref<any[]>([]);
let tagOptions = computed<any[]>(() => {
  let data: any[] = [];
  store.state.tags.map((item) => data.push(...item.children));
  data.forEach((item) => {
    item.label = item.name;
    item.value = item.id;
  });
  return data;
});

let infoOptions = [
  { label: "考研资讯", value: 1 },
  { label: "论坛交流", value: 2 },
];
if (store.state.userInfo?.type === ROLE.administrator) {
  infoOptions.unshift({ label: "公告信息", value: 0 });
}

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
  if (isInfo.value ? tags.value == undefined : !tags.value.length) {
    message.error("请选择相关标签！");
    return;
  }
  const content = editorEl.value.getJSON();
  if (!content) {
    message.error("请输入正文！");
    return;
  }
  if (isInfo.value) {
    const param = {
      title: title.value,
      content: JSON.stringify(content),
      type: tags.value as unknown as number,
    };
    addNotice(param).then(([res]) => {
      router.push("/info/" + res);
    });
  } else {
    formData.append("title", title.value);
    formData.append("tags", tags.value.join(","));
    formData.append("content", JSON.stringify(content));
    if (route.query.id) {
      formData.append("id", route.query.id as string);
    }
    uploadArticle(formData).then(
      ([res]) => {
        router.push("/article/" + res);
      },
      () => {
        formData = new FormData();
      }
    );
  }
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
  width: auto;
  max-width: 70vw;
  min-width: 300px;
}
.inline-block {
  display: inline-block;
}
</style>
