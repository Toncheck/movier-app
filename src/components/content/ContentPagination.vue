<template>
  <div class="pagination-container">
    <div class="pagination-container--withpages" v-if="currentPage">
      <div class="pagination-container__current-search">
        Your search:
        <div class="pagination-container__current-search--orange">
          {{ currentSearch }}
        </div>
      </div>
      <p class="pagination-container__message">
        We found more results - check them out
      </p>
      <ul class="pagination-container__pages">
        <li class="pagination-container__page-wrapper">
          <button
            v-for="(page, index) in listOfPages"
            :key="index"
            :id="page"
            class="pagination-container__page"
            :disabled="page === '...'"
            :class="
              page === currentPage
                ? 'pagination-container__page--orange'
                : 'pagination-container__page--grey'
            "
            @click="goToSelectedContentPage"
          >
            {{ page }}
          </button>
        </li>
      </ul>
    </div>
    <p class="pagination-container--nopages" v-else>
      No data to render. Please make a search. :)
    </p>
  </div>
</template>

<script>
export default {
  /* data() {
    return {};
  }, */
  methods: {
    // Metoda za pozivanje Actiona koji provjerava je li sadržaj za već odabrani page u Arrayu currentContentList (pristup na state, moguć samo iz actiona, a ne metode). I onda će taj Action pozvati u jednom slučaju Action za dobavu podataka iz currentContentList ili action za dobavu podataka iz getContentAPI

    // S obzirom na to da action getContentAPI za fetch očekuje podatke search i page, potrebno ih je proslijediti

    goToSelectedContentPage(event) {
      // Ovo ne treba jer na button stavljen dynamic attribute disabled
      // if (event.target.id === "...") return;c
      const data = {
        page: +event.target.id,
        search: this.currentSearch,
      };

      // this.$store.dispatch("content/getNewContent", data);

      /*    this.$router.replace({ name: "home", query: { page: data.page } }); */
      ///// URL QUERY
      console.log(`Click on page ${data.page} for ${data.search}`);
      this.$router.push({
        name: "home",
        query: { search: data.search, page: data.page },
      });
      ///// URL QUERY
    },
  },
  computed: {
    listOfPages() {
      return this.$store.getters["content/createListOfPages"];
    },

    currentPage() {
      return this.$store.getters["content/getCurrentPageNew"];
    },

    currentSearch() {
      return this.$store.getters["content/getCurrentSearch"];
    },
  },
};
</script>

<style lang="scss">
.pagination-container {
  text-align: center;
  padding-top: 0.5rem;
  padding-bottom: 1.5rem;
  margin-bottom: 2rem;

  &__current-search {
    margin: 0.2rem 0;
    &--orange {
      color: var(--color-secondary-dark);
      display: inline-block;
    }
  }

  &__message {
    margin-bottom: 0.2rem;
  }

  &__pages {
    display: flex;
    justify-content: center;
    list-style: none;
  }

  &__page {
    text-decoration: none;
    background-color: var(--color-white);
    padding: 0 0.4rem;
    margin: 0 0.2rem;
    cursor: pointer;
    &--orange {
      border: 1px solid var(--color-secondary-dark);
      color: var(--color-secondary-dark);
    }
    &--grey {
      border: 1px solid var(--color-grey-dark-3);
      color: var(--color-grey-dark-2);
    }
  }

  &--nopages {
    margin-top: 2.5rem;
    color: var(--color-secondary-dark);
  }
}
</style>
