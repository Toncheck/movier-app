import { createRouter, createWebHistory } from "vue-router";

import Details from "./pages/movies/Details.vue";
import Favourites from "./pages/movies/Favourites.vue";
import Home from "./pages/Home.vue";
import NotFound from "./pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: Home },
    { path: "/details", component: Details },
    { path: "/favourites", component: Favourites },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;
