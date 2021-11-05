<template>
  <the-header></the-header>
  <router-view></router-view>
  <the-footer></the-footer>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
import TheFooter from "./components/layout/TheFooter.vue";

export default {
  //Registracija kao local component in App.vue, jer se samo ovdje to i koristi. Ostalo što se vidi je dio <router-view></router-view>
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
  font-family: "Open Sans", sans-serif; //Ako browser ne može otvoriti Open Sans, onda otvara sans-serif ; Ovo dolazi iz google fonts koji je u index.html uveden
  font-weight: 400;
  line-height: 1.6;
  color: var(--color-grey-dark-2);
  background-size: cover;
  min-height: 100vh;
}

///////////////////////////////////////////////////////////////////////
//Styling za određene komponente kako bi se moglo promijenit centralno sve

.btn {
  opacity: 1;
  /* ovaj & je za dohvaćanje svih elemenata .btn koji nemaju nijednu pseudoclass */
  &,
  &:link,
  &:visited {
    text-transform: uppercase;
    text-decoration: none;
    /* element je postavljen kao inline-block jer je po defaultu inline te bi s namještenim paddingom prekrivao tekst gore */
    display: inline-block;
    margin: 1rem 0;
    /* font-size: 0.8rem; */
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

//Pitanje je: Stavit ono što je u #app u body ili je bolje da je u #app?
/* body {
} */
</style>
