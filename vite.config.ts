import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname);
  return {
    plugins: [
      vue(),
      Components({
        resolvers: [AntDesignVueResolver()],
      }),
    ],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        "@apis": resolve(__dirname, "src/request"),
        "@comps": resolve(__dirname, "src/components"),
        "@utils": resolve(__dirname, "src/utils"),
        "@views": resolve(__dirname, "src/views"),
      },
    },
  };
});
