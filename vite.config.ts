import path from "path";
import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import ElementPlus from "unplugin-element-plus/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import vue from "@vitejs/plugin-vue";
import { name } from "./package.json";

// https://vitejs.dev/config/
export default ({ mode }) =>
  defineConfig({
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [
          ElementPlusResolver({
            importStyle: "sass",
          }),
        ],
      }),
      ElementPlus({ useSource: true }),
    ],
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./"),
        "@": path.resolve(__dirname, "src"),
      },
      extensions: [".vue", ".ts", ".tsx", ".json"],
    },
    base: mode === "production" ? `/${name}/` : "/",
    build: {
      // Set this for gh-pages deploy dir
      // https://docs.github.com/cn/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
      outDir: "docs",
    },
    server: {
      proxy: {
        "/api": {
          target: "http://backend-api-02.newbee.ltd/manage-api/v1",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styles/element/index.scss" as *;',
        },
      },
    },
  });
