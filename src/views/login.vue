<template>
  <div
    class="login-page bg-cover w-full h-full flex justify-center items-center"
  >
    <div
      class="
        w-375px
        p-6
        bg-opacity-30 bg-white
        blur-20px
        flex flex-col
        items-center
      "
    >
      <p class="mb-3 text-3xl font-medium">考研分享平台</p>
      <p class="text-gray-500 mb-8">用户登录</p>
      <a-form
        :model="formState"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
        scrollToFirstError="true"
        class="w-full"
        size="medium"
      >
        <a-form-item hasFeedback required>
          <a-input v-model:value="formState.user" placeholder="用户名">
            <template #prefix
              ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
            /></template>
          </a-input>
        </a-form-item>
        <a-form-item hasFeedback required>
          <a-input
            v-model:value="formState.password"
            type="password"
            placeholder="密码"
          >
            <template #prefix
              ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
            /></template>
          </a-input>
        </a-form-item>
        <a-form-item class="text-center">
          <a-button
            type="primary"
            html-type="submit"
            :disabled="formState.user === '' || formState.password === ''"
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import { defineComponent, reactive, UnwrapRef } from "vue";
interface FormState {
  user: string;
  password: string;
}

const formState: UnwrapRef<FormState> = reactive({
  user: "",
  password: "",
});
const handleFinish = (values: FormState) => {
  console.log(values, formState);
};
const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => {
  console.log(errors);
};
</script>

<style scoped>
.login-page {
  background-image: url("@/assets/login-background.jpg");
}
</style>
