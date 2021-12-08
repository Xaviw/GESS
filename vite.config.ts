import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import WindiCSS from "vite-plugin-windicss";
import ViteComponents, { AntDesignVueResolver } from "vite-plugin-components";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname);
  return {
    plugins: [
      vue(),
      WindiCSS(),
      ViteComponents({
        customComponentResolvers: [AntDesignVueResolver()],
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
        "@comps": resolve(__dirname, "src/components"),
        "@utils": resolve(__dirname, "src/utils"),
        "@views": resolve(__dirname, "src/views"),
      },
    },
  };
});
