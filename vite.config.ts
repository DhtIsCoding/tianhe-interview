import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
import { vitePluginForArco } from "@arco-plugins/vite-vue";
import ReactivityTransform from "@vue-macros/reactivity-transform/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), ReactivityTransform(), UnoCSS(), vitePluginForArco()],
});
