<template>
  <content-filter></content-filter>

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
    ...mapGetters("content", {
      filteredCurrentContent: "getFilteredCurrentContent",
      hasContent: "hasContent",
    }),

    pageNumber() {
      const page = +this.page + +this.$route.query?.page;
      return page;
    },
  },

  created() {
    this.page = +this.$route.query?.page || null;
  },

  updated() {
  },
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
</style>
