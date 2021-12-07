import { defineConfig } from "vite-plugin-windicss";

export default defineConfig({
  attributify: true,
  extract: {
    include: ["src/**/*.{vue,html}"],
    exclude: ["node_modules", ".git"],
  },
  plugins: [require("@windicss/plugin-scrollbar")],
});
