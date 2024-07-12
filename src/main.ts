import { createApp } from "vue";
import App from "./App.vue";
import "virtual:uno.css";
import initI18n from "../i18n.config";

const app = createApp(App);

initI18n(app);

app.mount("#app");
