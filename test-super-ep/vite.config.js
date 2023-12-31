import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
      "@views": fileURLToPath(new URL("./src/views", import.meta.url)),
      "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
      "@demos": fileURLToPath(new URL("./src/demos", import.meta.url)),
      "@api": fileURLToPath(new URL("./src/api", import.meta.url)),
      "@hooks": fileURLToPath(new URL("./src/hooks", import.meta.url)),
      "@directives": fileURLToPath(
        new URL("./src/directives", import.meta.url)
      ),
    },
  },

  // 配置前端服务地址和端口
  server: {
    host: "0.0.0.0",
    port: 5173,

    // 是否开启 https
    https: false,

    // 让开发服务器帮我们做代理
    proxy: {
      // http://localhost:5173/api
      "/api": {
        target: "http://localhost:8173", //API服务地址
        changeOrigin: true, //开启跨域
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  
});
