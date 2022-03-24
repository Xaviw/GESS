import { createApp } from "vue";
import "ant-design-vue/dist/antd.css";

import App from "./App.vue";
import router from "./router";
import store, { key } from "./store";
import "@/styles/index.less";

createApp(App).use(router).use(store, key).mount("#app");
