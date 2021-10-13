import { createApp } from "vue";

import App from "./App.vue";
import router from "./router.js";
import store from "./store";

// Kreiranje same aplikacije
const app = createApp(App);

//Ovo definira da koristimo router za navigaciju po stranicama
app.use(router);
//Ovo definira da koristimo Vuex unutar projekta
app.use(store);

app.mount("#app");
