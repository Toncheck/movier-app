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
    { name: "details", path: "/details/:id", component: Details, props: true },
    { path: "/favourites", component: Favourites },
    { path: "/:notFound(.*)", component: NotFound },
  ],
  /* linkActiveClass: 'active', */
  scrollBehavior(to, from, savedPosition) {
    console.log(to, from, savedPosition);

    // savedPosition kao vrijednost postoji samo ako je stisnut gumb back u browseru, a inače je null. Prema tome, logika je, ako savedPosition postoji skoči na to poziciju koja je bila, ako ne skoči na vrh
    /* if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 }; */

    return savedPosition || { left: 0, top: 0 };
  },
});

export default router;
