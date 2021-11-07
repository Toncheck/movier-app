<template>
  <div class="pagination-container">
    <div class="pagination-container--withpages" v-if="currentPage">
      <div>Your search: {{ currentSearch }}</div>
      <p>We found more results - check them out</p>
      <ul class="pagination-container__pages">
        <li
          v-show="!firstPage"
          @click="goToFirstPage"
          class="pagination-container__page"
        >
          &laquo;
        </li>
        <li
          v-show="!firstPage"
          @click="goToPreviousPage"
          class="pagination-container__page"
        >
          &lsaquo;
        </li>

        <li
          href="#"
          :key="page"
          class="pagination-container__page"
          @click="jumpOnPage(page)"
        >
          {{ currentPage }}
        </li>

        <li
          v-show="!lastPage"
          @click="goToNextPage"
          class="pagination-container__page"
        >
          &rsaquo;
        </li>
        <li
          v-show="!lastPage"
          @click="goToLastPage"
          class="pagination-container__page"
        >
          &raquo;
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
  data() {
    return {
      //currentPage je podatak koji treba pobrati iz VUEX-a. Na početku je to 0, što znači da nema ništa za prikazati. To je iskorišteno u HTML-u kako bi se korisniku dao feedback, da se nema što prikazati.
      /* currentPageDummy: 3,
      lastPageDummy: false,
      firstPageDummy: false,
      totalPagesDummy: 6,
      jumpToPageDummy: null, */
    };
  },
  methods: {
    jumpOnPage(page) {
      this.$store.dispatch("content/loadContent", page);
    },
    goToPage(page) {
      const searchData = {
        search: this.currentSearch,
        page,
      };
      this.$store.dispatch("content/saveContent", searchData);
    },
    goToFirstPage() {
      this.goToPage(1);
    },
    goToLastPage() {
      this.goToPage(this.totalPages);
    },
    goToNextPage() {
      this.goToPage(this.currentPage + 1);
    },
    goToPreviousPage() {
      this.goToPage(this.currentPage - 1);
    },
  },
  computed: {
    currentPage() {
      return this.$store.getters["content/getCurrentPage"];
      /*   return 5; */
    },
    firstPage() {
      return this.$store.getters["content/getCurrentPage"] === 1;
    },
    totalPages() {
      return this.$store.getters["content/getTotalPages"];
    },
    lastPage() {
      return (
        this.$store.getters["content/getCurrentPage"] ===
        this.$store.getters["content/getTotalPages"]
      );
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
  padding: 1.5rem 0;
  border-top: 1px solid var(--color-grey-dark-3);
  margin-bottom: 2rem;

  &__pages {
    display: flex;
    justify-content: center;
    list-style: none;
  }

  &__page {
    padding: 0 0.4rem;
    margin: 0 0.2rem;
    border: 1px solid var(--color-grey-dark-3);
    cursor: pointer;
  }

  &--nopages {
    color: var(--color-secondary-dark);
  }
}
</style>
