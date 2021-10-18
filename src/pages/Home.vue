<template>
  <content-filter @change-filter="setFilters"></content-filter>
  <content-list></content-list>
  <content-pagination></content-pagination>
</template>

<script>
import ContentList from "../components/content/ContentList.vue";
import ContentPagination from "../components/content/ContentPagination.vue";
import ContentFilter from "../components/content/ContentFilter.vue";

export default {
  components: {
    ContentList,
    ContentPagination,
    ContentFilter,
  },
  data() {
    return {
      //objekt sa svim aktivnim filterima, koliko god ih ima
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    /* filteredContent() {
      const content = this.$store.getters['content/content'];
      return content.filter(content => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      });
    }, */
  },

  //loadaj podatke s vuexa ako postoji nešto cacheirano
  /* created() {
    this.loadContent();
  }, */

  methods: {
    //metoda setFilters bere iz CoachesList emitirani event kao parametar i koristi ga
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },

    async loadContent() {
      //Primjer koda za ovo je CoachesList
      //Ako je već stranica na kojoj je korisnik bio, pokupiti podatke iz vuexa
      //Ako je stranica na kojoj korisnik nije bio, pokupiti podatke s API-ja te ih cacheirati u vuex
    },
  },
};
</script>
