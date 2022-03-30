<template>
  <a-form :model="formState" layout="vertical" class="pwd-container">
    <a-form-item label="原密码">
      <a-input-password v-model:value="formState.oldPwd"> </a-input-password>
    </a-form-item>
    <a-form-item label="新密码">
      <a-input-password v-model:value="formState.newPwd"> </a-input-password>
    </a-form-item>
    <a-form-item label="重复新密码">
      <a-input-password v-model:value="formState.newPwdAgain">
      </a-input-password>
    </a-form-item>
    <a-form-item style="text-align: center">
      <a-button type="primary" html-type="submit" @click="onSubmit"
        >确认修改</a-button
      >
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { message } from "ant-design-vue";
import { UnwrapRef, reactive, toRaw } from "vue";
import { modifyPwd } from "@apis/apis";
import { handleLogout } from "@/utils";

const formState: UnwrapRef<{
  oldPwd: string;
  newPwd: string;
  newPwdAgain: string;
}> = reactive({
  oldPwd: "",
  newPwd: "",
  newPwdAgain: "",
});

const onSubmit = () => {
  let data: any = toRaw(formState);
  if (data.oldPwd === data.newPwd) {
    message.error("新密码不能与旧密码相同！");
  }
  if (data.newPwd !== data.newPwdAgain) {
    message.error("两次密码不一致！");
    return;
  }
  delete data.newPwdAgain;
  modifyPwd(data).then(() => {
    handleLogout();
  });
};
</script>

<style scoped lang="less">
.pwd-container {
  max-width: 400px;
  margin: 0 auto;
}
</style>
