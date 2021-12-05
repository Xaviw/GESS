import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname);
  return {
    plugins: [vue()],
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
        "@apis": resolve(__dirname, "src/apis"),
        "@assets": resolve(__dirname, "src/assets"),
        "@comps": resolve(__dirname, "src/components"),
        "@router": resolve(__dirname, "src/router"),
        "@store": resolve(__dirname, "src/store"),
        "@styles": resolve(__dirname, "src/styles"),
        "@types": resolve(__dirname, "src/types"),
        "@utils": resolve(__dirname, "src/utils"),
        "@views": resolve(__dirname, "src/views"),
      },
    },
  };
});
