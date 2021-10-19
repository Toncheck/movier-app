<template>
  <!-- FILTER -->
  <content-filter @change-filter="setFilters"></content-filter>
  <!-- CONTENT -->
  <ul v-if="hasContent" class="list">
    <contents-item
      v-for="record in content"
      :key="record.id"
      :id="record.id"
      :popularity="record.popularity"
      :title="record.title"
      :summary="record.summary"
    >
    </contents-item>
  </ul>
  <h3 v-else>No Content Found</h3>
  <!-- PAGINATION -->
  <content-pagination></content-pagination>
</template>

<script>
import ContentsItem from "../components/content/ContentsItem.vue";
import ContentPagination from "../components/content/ContentPagination.vue";
import ContentFilter from "../components/content/ContentFilter.vue";

export default {
  components: {
    ContentsItem,
    ContentPagination,
    ContentFilter,
  },
  data() {
    return {
      //objekt sa svim aktivnim filterima, koliko god ih ima
      activeFilters: { none: true, test: true },
    };
  },
  computed: {
    content() {
      //module je namespaced tako da je u ["content/content"] prvi content namespaced name, a drugi content je ime gettersa
      return this.$store.getters["content/content"];
    },
    hasContent() {
      return this.$store.getters["content/hasContent"];
    },
  },

  methods: {
    //metoda setFilters bere iz CoachesList emitirani event kao parametar i koristi ga
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
      console.log(this.activeFilters);
    },

    async loadContent() {
      //Primjer koda za ovo je CoachesList
      //Ako je već stranica na kojoj je korisnik bio, pokupiti podatke iz vuexa
      //Ako je stranica na kojoj korisnik nije bio, pokupiti podatke s API-ja te ih cacheirati u vuex
    },
  },
};
</script>

<style lang="scss">
.list {
  list-style: none;
  margin: auto;
  margin-top: 1rem;
  padding-top: 1rem;
  max-width: 70%;
}

.title {
  color: var(--color-primary);
}

.title-secondary {
  background-color: var(--color-secondary);
}
</style>
