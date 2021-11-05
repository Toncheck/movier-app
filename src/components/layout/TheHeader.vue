<template>
  <header class="header">
    <!-- NAVIGATION -->
    <nav class="user-nav">
      <ul class="user-nav__list">
        <li class="user-nav__item">
          <router-link class="user-nav__link" to="/home" @click="resetFilter"
            >Search</router-link
          >
        </li>
        <li class="user-nav__item">
          <router-link class="user-nav__link" to="/favourites"
            >My Favourites</router-link
          >
        </li>
      </ul>
    </nav>

    <div class="header-text">
      <p class="header-text__moto">We have it all!</p>
      <h1 class="header-text__title">Movie database</h1>
    </div>

    <div class="search-box">
      <!-- @load-data="loadData" -->
      <search-bar></search-bar>
    </div>
  </header>
</template>

<script>
import SearchBar from "../ui/SearchBar.vue";

export default {
  components: {
    SearchBar,
  },
  methods: {
    //metoda koja se poziva ako je kliknuto na searc gore u headeru pa da bi se maknuo filter sa stranice
    resetFilter() {
      this.$store.dispatch("content/resetFilter", {});
    },
  },
};
</script>

<style lang="scss">
///////////////////////////////////////////////////////////////////////
//HEADER

.header {
  display: flex;
  flex-direction: column;
  /* background-color: black; */
  background-color: none;
  background-image: linear-gradient(
    var(--color-grey-dark-1),
    var(--color-black-dark-3)
  );
  padding: 0 15%;
  /* flex-wrap: wrap; */

  /* & > * {
    flex: 0 0 100%;
  } */
}

///////////////////////////////////////////////////////////////////////
//USER NAV

.user-nav {
  /* background-color: chartreuse; */
  align-self: flex-end;
  /* font-size: 1.2rem; */

  &__list {
    display: flex;
    list-style: none;
    /* text-align: center; */
  }

  &__item {
    padding-top: 0.5rem;
  }

  &__link {
    display: inline-block;
    padding: 0.5rem 2rem;
    border-bottom: 1px solid var(--color-grey-dark-2);

    &:link,
    &:visited {
      color: var(--color-white);
      /* font-size: 1rem; */

      text-decoration: none;
      text-transform: uppercase;
    }

    &:hover {
      border-bottom: 1px solid var(--color-secondary-dark);
    }
  }
}

/////////////////////////////////////////////////////////////////
//HEADER TEXT

.header-text {
  :last-child {
    margin: 0.5rem 0;
  }

  &__moto {
    color: var(--color-secondary-light);
    text-transform: uppercase;
  }

  &__title {
    color: var(--color-white);
    font-size: 2rem;
  }
}
/////////////////////////////////////////////////////////////////
//HEADER TEXT

.search-box {
  background-color: var(--color-white);
  border-radius: 15px 15px 0 0;
  padding-top: 1rem;
}
</style>
