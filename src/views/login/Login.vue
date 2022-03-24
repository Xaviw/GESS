<template>
  <div class="background flex-center">
    <div class="box">
      <p class="title">{{ appTitle }}</p>
      <p class="info">用户登录</p>
      <a-form
        ref="formRef"
        :model="loginForm"
        :rules="loginRules"
        @finish="handleSubmit"
        :scrollToFirstError="true"
      >
        <a-form-item hasFeedback name="account">
          <a-input
            v-model:value="loginForm.account"
            placeholder="账号"
            autocomplete="username"
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
            autocomplete="current-password"
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
            autocomplete="new-password"
          >
            <template #prefix
              ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
            /></template>
          </a-input>
        </a-form-item>
        <div class="register">
          <a @click="changePageState">{{
            isLoginState ? "注册账号" : "前往登录"
          }}</a>
        </div>
        <a-form-item>
          <a-button type="primary" html-type="submit" style="width: 100%">
            {{ isLoginState ? "登录" : "注册" }}
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";

import { ref, reactive, UnwrapRef, inject } from "vue";
import type { RuleObject } from "ant-design-vue/es/form";
import { useRoute, useRouter } from "vue-router";
import type { IUserForm } from "@/types/common";
import { login, register } from "@/request/apis";
import { local } from "@/utils/storage";
import { myStore } from "@/store";

const appTitle = inject("appTitle");

const router = useRouter();
const route = useRoute();
const store = myStore();

// 登录注册状态
let isLoginState = ref(true);
function changePageState() {
  loginForm.password = loginForm.confirm = "";
  isLoginState.value = !isLoginState.value;
}

// 验证器
let validateName = async (_rule: RuleObject, value: string) => {
  if (value === "") {
    return Promise.reject("请输入账号");
  } else if (
    !isLoginState.value &&
    (value.length < 6 ||
      value.length > 16 ||
      !/^[a-zA-Z0-9]{6,16}$/.test(value))
  ) {
    return Promise.reject("账号应为6-16位的数字或字母");
  }
  return Promise.resolve();
};
let validatePass = async (_rule: RuleObject, value: string) => {
  if (value === "") {
    return Promise.reject("请输入密码");
  } else if (!isLoginState.value) {
    if (value.length < 6 || value.length > 16) {
      return Promise.reject("密码长度应为6-16位");
    }
    if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{6,16}$/.test(value)) {
      return Promise.reject("密码应至少包含一个数字和字母");
    }
    if (loginForm.confirm !== "") {
      formRef.value.validateFields("confirm");
    }
  }
  return Promise.resolve();
};
let validatePass2 = async (_rule: RuleObject, value: string) => {
  if (value === "") {
    return Promise.reject("请再次输入密码");
  } else if (!isLoginState.value && value !== loginForm.password) {
    return Promise.reject("两次输入不一致");
  }
  return Promise.resolve();
};

// 表单
const formRef = ref();
const loginForm: UnwrapRef<IUserForm> = reactive({
  account: "",
  password: "",
  confirm: "",
});
const loginRules = {
  account: [
    {
      validator: validateName,
      trigger: "blur",
    },
  ],
  password: [{ validator: validatePass, trigger: "change" }],
  confirm: [{ validator: validatePass2, trigger: "change" }],
};

const handleSubmit = (values: IUserForm) => {
  if (isLoginState.value) {
    login(values).then(([res]) => {
      store.commit("modify", {
        alreadyLogin: true,
        userInfo: res,
        role: res.type,
      });
      local.set("userInfo", res, 1000 * 60 * 60 * 24 * 7);
      router.replace(
        typeof route.query.redirect == "string" ? route.query.redirect : "/"
      );
    });
  } else {
    register(values as Required<IUserForm>).then(() => {
      changePageState();
    });
  }
};
</script>

<style lang="less" scoped>
.background {
  width: 100vw;
  height: 100vh;
  background-image: url(@/assets/login-background.jpg);
  background-repeat: no-repeat;
}
.box {
  width: 375px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(5px);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  .title {
    margin-bottom: 10px;
    font-size: 1.1rem;
    font-weight: bold;
  }
  .info {
    color: gray;
    margin-bottom: 20px;
  }
  .register {
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 10px;
  }
}
</style>
