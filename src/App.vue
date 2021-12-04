<template>
  <the-header></the-header>
  <router-view></router-view>
  <the-footer></the-footer>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
import TheFooter from "./components/layout/TheFooter.vue";

export default {
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600");
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

body {
  font-family: "Open Sans", sans-serif;
  font-weight: 400;
  line-height: 1.6;
  color: var(--color-grey-dark-2);
  background-size: cover;
  min-height: 100vh;
}

.btn {
  opacity: 1;

  &,
  &:link,
  &:visited {
    text-transform: uppercase;
    text-decoration: none;

    display: inline-block;
    margin: 1rem 0;

    cursor: pointer;
    font-size: 0.8rem;
  }

  &--orange {
    color: var(--color-secondary-dark);
    background-color: none;
  }
}

.color {
  background-color: var(--color-black-dark-1);
}
</style>
