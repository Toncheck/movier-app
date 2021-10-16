import { createApp } from "vue";

//Import router paketa
import router from "./router.js";
//Import Vuex paketa
import store from "./store/index.js";
/* import store from "./store/index.js"; */

//Import App.vue filea kao glavnog file na temelju kojeg se dolje kreira aplikacija
import App from "./App.vue";

//Import App.vue filea kao glavnog file na temelju kojeg se dolje kreira aplikacija

//Import raznih user interface component fileova koji se mogu koristiti bilo gdje u projektu. Neki su samo za styling, a neke mogoćavaju i dodatne stvari

//import RESET.CSS filea koji pobija određene defaultne css postavke
import "./assets/_reset.scss";

// Kreiranje same aplikacije
const app = createApp(App);

//Ovo definira da koristimo router za navigaciju po stranicama
app.use(router);
//Ovo definira da koristimo Vuex unutar projekta
app.use(store);

app.mount("#app");
