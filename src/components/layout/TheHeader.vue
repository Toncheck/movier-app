<template>
  <header class="header">
    <!-- NAVIGATION -->
    <nav class="user-nav">
      <ul class="user-nav__list">
        <li class="user-nav__item">
          <router-link class="user-nav__link" to="/home" @click="reset"
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
      <search-bar @load-data="loadData"></search-bar>
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
    loadData(data) {
      this.$store.dispatch("content/loadContent", data);

      //Nakon što je napravljen dispatch podataka skoči natrag na home page kako bi se podaci mogli vidjeti. The Header je korišten od dvije stranice pa je zato to potrebno, ako se slučajno nalazimo na favourites kako bismo se vratili na home gdje možemo vidjeti prikaz rezultata searcha
      //Korištenjem metode replace umjesto push se ne može skočiti natrag na stranicu na kojoj smo bili npr. favourites. Stvar preferencije koje koristiti
      this.$router.replace("/home");
    },
  },
};
</script>

<style lang="scss">
///////////////////////////////////////////////////////////////////////
//HEADER

.header {
  font-size: 1.4rem;
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
      font-size: 1rem;

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
  &__moto {
    color: var(--color-secondary-light);
    text-transform: uppercase;
    font-size: 0.8rem;
  }

  &__title {
    color: var(--color-white);
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
