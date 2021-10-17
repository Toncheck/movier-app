<template>
  <div class="pagination--container">
    <div class="pagination--container__withpages" v-if="currentPage">
      <p>We found more results - check them out</p>
      <ul class="pagination--container__pages">
        <li
          href="#"
          v-for="page in totalPages"
          :key="page"
          class="pagination--container__page"
          @click="jumpOnPage(page)"
        >
          {{ page }}
        </li>
      </ul>
    </div>
    <p class="pagination--container__nopages" v-else>
      No data to render. Please make a search. :)
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //currentPage je podatak koji treba pobrati iz VUEX-a. Na početku je to 0, što znači da nema ništa za prikazati. To je iskorišteno u HTML-u kako bi se korisniku dao feedback, da se nema što prikazati.
      currentPage: 3,
      totalPages: 6,
      jumpToPage: null,
    };
  },
  methods: {
    jumpOnPage(page) {
      this.$store.dispatch("content/loadContent", page);
    },
  },
  /* computed: {
      lowSetOfPages: function() {
      return this
    },
    highSetOfPages(){
      //
    } */
};
</script>

<style lang="scss">
.pagination--container {
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

  &__nopages {
    color: var(--color-secondary-dark);
  }
}
</style>
