import { createRouter, createWebHistory } from "vue-router";

import Details from "./pages/movies/Details.vue";
import Favourites from "./pages/movies/Favourites.vue";
import Home from "./pages/Home.vue";
import NotFound from "./pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    { name: "home", path: "/home", component: Home },
    { name: "details", path: "/details/:id", component: Details, props: true },
    { path: "/favourites", component: Favourites },
    { path: "/:notFound(.*)", component: NotFound },
  ],

  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
});

export default router;
