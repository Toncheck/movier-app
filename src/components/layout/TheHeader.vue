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
  padding: 0 0;

  @include respond(phone-small) {
    padding: 0 5%;
  }

  @include respond(phone) {
    padding: 0 15%;
  }
  /* flex-wrap: wrap; */

  /* & > * {
    flex: 0 0 100%;
  } */
}

///////////////////////////////////////////////////////////////////////
//USER NAV

.user-nav {
  /* background-color: chartreuse; */
  align-self: center;
  min-width: 100%;
  margin-bottom: 1rem;
  /* font-size: 1.2rem; */

  @include respond(tab-port) {
    align-self: flex-end;
    margin-bottom: 0;
    min-width: 0;
  }

  &__list {
    display: flex;
    list-style: none;
    /* text-align: center; */
    justify-content: center;
    min-width: 100%;
    flex-direction: column;

    @include respond(phone-small) {
      flex-direction: row;
    }

    :first-child {
      min-width: 40%;

      @include respond(tab-port) {
        min-width: 0;
      }
    }

    &:last-child {
      min-width: 60%;

      @include respond(tab-port) {
        min-width: 0;
      }
    }

    @include respond(tab-port) {
      justify-content: flex-start;
    }
  }

  &__item {
    padding-top: 0.5rem;
    text-align: center;
    min-width: 50%;
    border-bottom: 1px solid var(--color-grey-dark-2);

    @include respond(tab-port) {
      min-width: 0;
      border-bottom: 0;
    }
  }

  &__link:hover .user-nav__item {
    background-color: red;
  }

  &__link {
    display: inline-block;
    padding: 0.5rem 2rem;
    border-bottom: 0;

    @include respond(tab-port) {
      border-bottom: 1px solid var(--color-grey-dark-2);
    }

    &:link,
    &:visited {
      color: var(--color-white);
      /* font-size: 1rem; */

      text-decoration: none;
      text-transform: uppercase;
    }

    &:hover {
      @include respond(tab-port) {
        border-bottom: 1px solid var(--color-secondary-dark);
      }
    }
  }
}

/////////////////////////////////////////////////////////////////
//HEADER TEXT

.header-text {
  padding-left: 1rem;
  @include respond(phone-small) {
    padding-left: 0;
  }

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
  padding-top: 1rem;

  @include respond(phone-small) {
    border-radius: 15px 15px 0 0;
  }
}
</style>
