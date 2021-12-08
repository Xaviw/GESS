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
        ref="formRef"
        :model="loginForm"
        :rules="loginRules"
        @finish="handleLogin"
        scrollToFirstError="true"
        class="w-full"
      >
        <a-form-item hasFeedback name="account">
          <a-input
            v-model:value="loginForm.account"
            placeholder="用户名"
            autocomplete="off"
          >
            <template #prefix
              ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
            /></template>
          </a-input>
        </a-form-item>
        <a-form-item hasFeedback name="password">
          <a-input
            v-model:value="loginForm.password"
            type="password"
            placeholder="密码"
            autocomplete="off"
          >
            <template #prefix
              ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
            /></template>
          </a-input>
        </a-form-item>
        <div class="flex justify-between mb-4">
          <a-checkbox v-model:checked="rememberLogin">记住登录状态</a-checkbox>
          <span>
            <a href="">忘记密码</a>
            |
            <a href="">注册账号</a>
          </span>
        </div>
        <a-form-item class="text-center">
          <a-button type="primary" html-type="submit" class="w-full">
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { ref, reactive, UnwrapRef } from "vue";
import { UserForm } from "@/types/user";

const formRef = ref();
const loginForm: UnwrapRef<UserForm> = reactive({
  account: "",
  password: "",
});
const loginRules = {
  account: [{ required: true, trigger: "blur", message: "请输入账号" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      min: 6,
      max: 16,
      message: "密码长度应为6-16位",
      trigger: "blur",
    },
    {
      pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{6,16}$/,
      trigger: "blur",
      message: "密码应至少包含一个字母和一个数字",
    },
  ],
};
const handleLogin = (values: UserForm) => {
  console.log(values, loginForm);
  // loginForm.validate();
};

let rememberLogin = ref(false);
</script>

<style>
.login-page {
  background-image: url("@/assets/login-background.jpg");
}
</style>
