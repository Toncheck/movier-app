<template>
  <the-header class="header"></the-header>
  <router-view></router-view>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";

export default {
  //Registracija kao local component in App.vue, jer se samo ovdje to i koristi. Ostalo što se vidi je dio <router-view></router-view>
  components: {
    TheHeader,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600");
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

body {
  font-family: "Open Sans", sans-serif; //Ako browser ne može otvoriti Open Sans, onda otvara sans-serif ; Ovo dolazi iz google fonts koji je u index.html uveden
  font-weight: 400;
  line-height: 1.6;
  color: var(--color-grey-dark-2);
  background-image: linear-gradient(
    to right bottom,
    var(--color-primary-light),
    var(--color-primary-dark)
  );
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: red;
    }
  }
}

//Pitanje je: Stavit ono što je u #app u body ili je bolje da je u #app?
/* body {
} */
</style>
