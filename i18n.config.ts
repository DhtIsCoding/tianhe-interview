import { type App } from "vue";
import { createI18n } from "vue-i18n";
import chinese from "./public/i18n/zh-CN.json";

export default function initI18n(app: App<Element>) {
  const i18n = createI18n({
    locale: "zh-CN",
    legacy: false,
    // fallbackLocale: "en",
    messages: {
      "zh-CN": chinese,
    },
  });

  app.use(i18n);
}
