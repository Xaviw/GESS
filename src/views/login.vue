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
        <mobile:(w-full)
      "
    >
      <p class="mb-3 text-3xl font-medium">考研分享平台</p>
      <p class="text-gray-500 mb-8">用户登录</p>
      <a-form
        :ref="formRef"
        :model="loginForm"
        :rules="loginRules"
        @finish="handleLogin"
        scrollToFirstError="true"
        class="w-full"
      >
        <a-form-item hasFeedback name="account">
          <a-input v-model:value="loginForm.account" placeholder="用户名">
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
          >
            <template #prefix
              ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
            /></template>
          </a-input>
        </a-form-item>
        <a-form-item hasFeedback name="confirm" v-if="!isLoginState">
          <a-input
            v-model:value="loginForm.confirm"
            type="password"
            placeholder="确认密码"
          >
            <template #prefix
              ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
            /></template>
          </a-input>
        </a-form-item>
        <div class="flex flex-row-reverse justify-between mb-4">
          <a @click="changePageState">{{
            isLoginState ? "注册账号" : "前往登录"
          }}</a>
          <a-checkbox v-model:checked="rememberLogin" v-show="isLoginState"
            >记住登录状态</a-checkbox
          >
        </div>
        <a-form-item class="text-center">
          <a-button type="primary" html-type="submit" class="w-full">
            {{ isLoginState ? "登录" : "注册" }}
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { ref, reactive, UnwrapRef } from "vue";
import type { RuleObject } from "ant-design-vue/es/form";
import type { UserForm } from "@/types/user";
import http from "@/apis/request";

// 登录注册状态
let isLoginState = ref(true);
function changePageState() {
  loginForm.password = loginForm.confirm = "";
  isLoginState.value = !isLoginState.value;
}

// 记住登录状态
let rememberLogin = ref(false);

// 密码验证器
let validatePass = async (_rule: RuleObject, value: string) => {
  if (value === "") {
    return Promise.reject("请输入密码");
  } else {
    if (value.length < 6 || value.length > 16) {
      return Promise.reject("密码长度应为6-16位");
    }
    if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{6,16}$/.test(value)) {
      return Promise.reject("密码应至少包含一个数字和字母");
    }
    if (loginForm.confirm !== "") {
      formRef.value.validateFields("confirm");
    }
    return Promise.resolve();
  }
};
let validatePass2 = async (_rule: RuleObject, value: string) => {
  if (value === "") {
    return Promise.reject("请再次输入密码");
  } else if (value !== loginForm.password) {
    return Promise.reject("两次输入不一致");
  } else {
    return Promise.resolve();
  }
};

// 表单
const formRef = ref();
const loginForm: UnwrapRef<UserForm> = reactive({
  account: "",
  password: "",
  confirm: "",
});
const loginRules = {
  account: [{ required: true, trigger: "blur", message: "请输入账号" }],
  password: [{ validator: validatePass, trigger: "change" }],
  confirm: [{ validator: validatePass2, trigger: "change" }],
};
const handleLogin = (values: UserForm) => {
  if (isLoginState.value) {
    http.post("/login", values).then((res) => {});
  } else {
  }
};
</script>

<style>
.login-page {
  background-image: url("@/assets/login-background.jpg");
}
</style>
