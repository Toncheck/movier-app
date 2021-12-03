<template>
  <!-- FILTER -->
  <content-filter></content-filter>
  <!-- CONTENT -->
  <div class="home">
    <ul v-if="hasContent" class="home__list">
      <contents-item
        v-for="record in filteredCurrentContent"
        :key="record.id"
        :id="record.id"
        :posterPath="record.poster_path"
        :popularity="record.popularity"
        :title="record.original_title"
        :summary="record.overview"
        :mediaType="record.media_type"
      >
      </contents-item>
    </ul>
    <div v-else class="home__no-content">
      <h3 class="home__no-content--title">Welcome to Movie database!</h3>
      <p class="home__no-content--message">
        Make a search and find what You need.
      </p>
    </div>
  </div>
  <!-- PAGINATION -->
  <content-pagination></content-pagination>
</template>

<script>
import ContentsItem from "../components/content/ContentsItem.vue";
import ContentPagination from "../components/content/ContentPagination.vue";
import ContentFilter from "../components/content/ContentFilter.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    ContentsItem,
    ContentPagination,
    ContentFilter,
  },
  data() {
    return {
      page: 0,
    };
  },
  watch: {
    pageNumber() {
      const query = this.$route.query;
      if (!(query?.page || query?.search)) return;
      else {
        this.$store.dispatch(
          "content/getNewContent",
          this.$route.query || { search: "", page: null }
        );
      }
    },
  },
  computed: {
    // Pozivanje preko mapHelpera
    ...mapGetters("content", {
      filteredCurrentContent: "getFilteredCurrentContent",
      hasContent: "hasContent",
    }),

    // Pozivanje klasično,a ne pomoću mapGettersa
    /* filteredCurrentContent() {
      return this.$store.getters["content/getFilteredCurrentContent"];
    }, */

    /* hasContent() {
      //module je namespaced tako da je u ["content/content"] prvi content namespaced name, a drugi content je ime gettersa
      return this.$store.getters["content/hasContent"];
    }, */

    pageNumber() {
      const page = +this.page + +this.$route.query?.page;
      return page;
    },
  },

  // Inicjalna ideja je pozvati created ako je preko url query parametra pozva, no kako postoji mogućnost da on bude aktiviran i zbog prvog loada pagea kad nema nikakvog url querya potrebno je provjeriti je li takav slučaj i ako je odbaciti to

  ///// URL QUERY
  created() {
    console.log("Created - Home");
    this.page = +this.$route.query?.page || null;
    // const query = this.$route.query;
    // console.log(query?.page);
    // //Ako je istina da je query undefined ili da je page undefined ili da je search undefined tada prekini dobavu podataka. Undefined će biti na početku prilikom prvog tj. inicijalnog učitavanja stranice
    // if (!(query?.page || query?.search)) return;
    // // else je za situaciju u kojoj će za upis kroz url biti aktiviran created pa treba dobaviti novi sadržaj
    // else {
    //   this.$store.dispatch(
    //     "content/getNewContent",
    //     this.$route.query || { search: "", page: null }
    //   );
    // }
  },

  updated() {
    console.log("updated - Home.vue");
    /*const query = this.$route.query;
    if (!(query?.page || query?.search)) return;
    else {
      this.$store.dispatch("content/checkIfNewPage", query);
    }*/
  },
  ///// URL QUERY
};
</script>

<style lang="scss">
.home {
  &__list {
    list-style: none;
    margin: auto;

    max-width: 70%;

    @include respond(tab-port) {
      margin-top: 1rem;
      padding-top: 1rem;
    }
  }

  &__no-content {
    min-height: 50vh;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;

    &--title {
      font-size: 1.5rem;
      text-align: center;

      @include respond(tab-port) {
        font-size: 2rem;
      }
    }

    &--message {
      text-align: center;
      font-size: 1.2rem;
    }
  }

  .title {
    color: var(--color-primary);
  }

  .title-secondary {
    background-color: var(--color-secondary);
  }
}

/* .home__list::v-deep .item__left-box {
  background-color: red;
} */
</style>
