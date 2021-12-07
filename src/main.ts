import { createApp } from "vue";
import "virtual:windi.css";
import "virtual:windi-devtools";

import App from "./App.vue";
import router from "./router";
import store, { key } from "./store";
import "@/styles/index.css";

createApp(App).use(router).use(store, key).mount("#app");
