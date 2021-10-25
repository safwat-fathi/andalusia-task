import { createApp } from "vue";
// import { createI18n } from "vue-i18n";

import App from "./App.vue";
import router from "./router";
import store from "./store";

// global styles
import "@/assets/styles/global.scss";

const app = createApp(App);

// plugins
import { messages } from "./plugins/i18n";

app.use(store);

app.use(router);

// const i18n = createI18n({
//   locale: "en", // set locale
//   fallbackLocale: "en", // set fallback locale
//   messages, // set locale messages
// });

// app.use(i18n);
app.mount("#app");
