<template>
  <!-- FILTER -->
  <content-filter @change-filter="setFilters"></content-filter>
  <!-- CONTENT -->
  <ul v-if="hasContent" class="list">
    <contents-item
      v-for="record in filteredContent"
      :key="record.id"
      :id="record.id"
      :posterPath="record.posterPath"
      :popularity="record.popularity"
      :title="record.title"
      :summary="record.overview"
    >
    </contents-item>
  </ul>
  <div v-else class="no-content">
    <h3 class="no-content__title">Welcome to Movie database!</h3>
    <p class="no-content__message">Make a search and find what You need.</p>
  </div>

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
    hasContent() {
      //module je namespaced tako da je u ["content/content"] prvi content namespaced name, a drugi content je ime gettersa
      return this.$store.getters["content/hasContent"];
    },
    filteredContent() {
      /*uvuci sav mogući sadržaj za tu stranicu, a to su svi zapisi unutar nekog objekta sljedećeg oblika 
      { 147532 : { 
                  title: Noi non siamo come James Bond,
                  popularity:  1.976, 
                  posterPath:  null,
                  overview: "How two friends, thanks to the strong ..." 
            },
        ...
      }*/
      const content = this.$store.getters["content/getContent"];

      //ovdje ide reduciranje tog sadržaja prema statusima filtera
      console.log(content);
      return content;
    },
  },

  methods: {
    //metoda setFilters bere iz ContentsList emitirani event kao parametar i koristi ga za update filtera
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
      console.log(this.activeFilters);
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

.no-content {
  min-height: 58vh;
  /* text-align: center; */
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;

  &__title {
    font-size: 4rem;
    /* display: block; */
  }

  &__message {
    font-size: 1.2rem;
  }
}
</style>
