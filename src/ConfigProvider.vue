<template>
  <a-config-provider :locale="locale">
    <App />
  </a-config-provider>
</template>

<script lang="ts" setup>
import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import App from "./App.vue";
dayjs.locale("zh-cn");

const locale = zhCN;
</script>
