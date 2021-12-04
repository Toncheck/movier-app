import { createApp } from "vue";

import router from "./router.js";

import store from "./store/index.js";

import App from "./App.vue";

import "./assets/_reset.scss";

const app = createApp(App);

app.use(router);
app.use(store);

app.mount("#app");
