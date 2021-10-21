<template>
  <div class="pagination-container">
    <div class="pagination-container--withpages" v-if="currentPage">
      <p>We found more results - check them out</p>
      <!-- <ul class="pagination-container__pages">
        <li
          href="#"
          v-for="page in totalPages"
          :key="page"
          class="pagination-container__page"
          @click="jumpOnPage(page)"
        >
          {{ page }}
        </li>
      </ul> -->
      <ul class="pagination-container__pages">
        <div v-show="!firstPageDummy">
          <li class="pagination-container__page">&laquo;</li>
          <li class="pagination-container__page">&lsaquo;</li>
        </div>

        <li
          href="#"
          :key="page"
          class="pagination-container__page"
          @click="jumpOnPage(page)"
        >
          {{ currentPageDummy }}
        </li>
        <div v-show="!lastPageDummy">
          <li class="pagination-container__page">&rsaquo;</li>
          <li class="pagination-container__page">&raquo;</li>
        </div>
      </ul>
      <div>{{ currentPage }}</div>
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
      currentPageDummy: 3,
      lastPageDummy: true,
      firstPageDummy: true,
      totalPagesDummy: 6,
      jumpToPageDummy: null,
    };
  },
  methods: {
    jumpOnPage(page) {
      this.$store.dispatch("content/loadContent", page);
    },
  },
  computed: {
    currentPage() {
      /* return this.$store.getters["content/getCurrentPage"]; */
      return 5;
    },
    firstPage() {
      return false || this.$store.getters["content/getCurrentPage"] === 1;
    },
    totalPages() {
      return this.$store.getters["content/getTotalPages"];
    },
    lastPage() {
      return (
        false ||
        this.$store.getters["content/getCurrentPage"] ===
          this.$store.getters["content/getTotalPages"]
      );
    },
  },
};
</script>

<style lang="scss">
.pagination-container {
  text-align: center;
  padding: 1.5rem 0;
  border-top: 1px solid var(--color-grey-dark-3);

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
