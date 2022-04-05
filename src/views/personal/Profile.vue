<template>
  <div class="container">
    <div class="flex-between header">
      <div class="flex-between">
        <a-avatar :size="64" :src="imageUrl">
          <template #icon><UserOutlined /></template>
        </a-avatar>
        <div class="header-info">
          <span>{{ store.state.userInfo?.name }}</span>
          <span
            >建议尺寸: 100×100px，支持:
            .jpg、.gif、.png格式的图片，图片大小请不要超过1M</span
          >
        </div>
      </div>
      <a-upload
        name="file"
        :show-upload-list="false"
        action="/user/updateFace"
        :before-upload="beforeUpload"
        @change="handleChange"
      >
        <a-button type="primary" :loading="loading">上传头像</a-button>
      </a-upload>
    </div>
    <a-form :model="formState" layout="vertical" class="info-form">
      <a-form-item label="昵称">
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item label="电话">
        <a-input v-model:value="formState.phone" />
      </a-form-item>
      <a-form-item label="性别">
        <a-radio-group v-model:value="formState.sex" name="sexGroup">
          <a-radio :value="SEX.male">男</a-radio>
          <a-radio :value="SEX.female">女</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="生日">
        <a-date-picker v-model:value="formState.birthday" />
      </a-form-item>
      <a-form-item style="text-align: center">
        <a-button type="primary" html-type="submit" @click="onSubmit"
          >保存修改</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { UserOutlined } from "@ant-design/icons-vue";
import { myStore } from "@/store";
import { getBase64 } from "@/utils";
import { message } from "ant-design-vue";
import { reactive, ref, toRaw, UnwrapRef } from "vue";
import { IUserInfo } from "@/types/common";
import { SEX } from "@/types/common";
import dayjs, { Dayjs } from "dayjs";
import { modifyProfile } from "@apis/apis";
import { local } from "@/utils/storage";
import { userInfo } from "os";
export type IModifyInfo = Partial<
  Pick<IUserInfo, "name" | "sex" | "phone"> & { birthday?: Dayjs }
>;

const store = myStore();

const loading = ref<boolean>(false);
const imageUrl = ref<string>(store.state.userInfo?.face ?? "");

const handleChange = (info: any) => {
  if (info.file.status === "uploading") {
    loading.value = true;
    return;
  }
  if (info.file.status === "done" && info.file.response.data.face) {
    imageUrl.value = info.file.response.data.face;
    store.commit("modify", {
      userInfo: { ...store.state.userInfo, face: info.file.response.data.face },
    });
    local.set(
      "userInfo",
      { ...local.get("userInfo"), face: info.file.response.data.face },
      1000 * 60 * 60 * 24 * 7
    );
    loading.value = false;
  }
  if (info.file.status === "error") {
    loading.value = false;
    message.error("上传失败，请稍后再试！");
  }
};

const beforeUpload = (file: any) => {
  const isJpgOrPng =
    file.type === "image/jpeg" ||
    file.type === "image/png" ||
    file.type === "image/gif";
  if (!isJpgOrPng) {
    message.error("请选择正确的图片类型!");
  }
  const isLt2M = file.size / 1024 / 1024 < 1;
  if (!isLt2M) {
    message.error("图片大小不能超过1M!");
  }
  return isJpgOrPng && isLt2M;
};

const formState: UnwrapRef<IModifyInfo> = reactive({
  name: store.state.userInfo?.name,
  sex: store.state.userInfo?.sex,
  phone: store.state.userInfo?.phone,
  birthday: dayjs(store.state.userInfo?.birthday, "YYYY-MM-DD"),
});
const onSubmit = () => {
  let data: any = toRaw(formState);
  data.birthday = dayjs(data.birthday).format("YYYY-MM-DD");
  modifyProfile(data);
};
</script>

<style scoped lang="less">
.container {
  margin: 0 auto;
}
.header {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #f4f4f4;
}
.header-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 15px;
  > span:first-of-type {
    font-weight: bolder;
    margin-bottom: 15px;
  }
  > span:last-of-type {
    color: #999;
    font-size: 0.875rem;
  }
}
.info-form {
  margin: 0 auto;
  max-width: 400px;
}
</style>
