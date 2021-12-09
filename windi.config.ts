import { defineConfig } from "vite-plugin-windicss";

export default defineConfig({
  extract: {
    include: ["src/**/*.{vue,html}"],
    exclude: ["node_modules", ".git"],
  },
  plugins: [require("@windicss/plugin-scrollbar")],
  theme: {
    screens: {
      mobile: "425px",
    },
  },
});
