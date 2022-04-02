import { createApp } from "vue";
import "ant-design-vue/dist/antd.css";

import ConfigProvider from "./ConfigProvider.vue";
import router from "./router";
import store, { key } from "./store";
import "@/styles/index.less";

createApp(ConfigProvider).use(router).use(store, key).mount("#app");
