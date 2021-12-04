<template>
  <div class="favourites">
    <ul v-if="hasFavourites" class="favourites__list">
      <contents-item
        v-for="(value, record) in favourites"
        :key="+record"
        :id="+record"
        :posterPath="value.poster_path"
        :popularity="value.popularity"
        :title="value.title"
        :summary="value.overview"
        :mediaType="value.mediaType"
      >
      </contents-item>
    </ul>
    <div v-else class="favourites__no-content">
      <h3 class="favourites__no-content--title">
        You do not have any favourite saved.
      </h3>
      <p class="favourites__no-content--message">
        Make a search and pick your favourites.
      </p>
    </div>
  </div>
</template>

<script>
import ContentsItem from "../../components/content/ContentsItem.vue";

export default {
  components: {
    ContentsItem,
  },
  data() {
    return {
      favourites: {},
    };
  },

  methods: {
    loadFavourites() {
      this.favourites = JSON.parse(localStorage.getItem("favourites")) || {};
    },
  },

  computed: {
    hasFavourites() {
      return Object.entries(this.favourites).length;
    },
  },

  created() {
    this.loadFavourites();
  },
};
</script>

<style lang="scss">
.favourites {
  &__list {
    list-style: none;
    margin: auto;
    margin-top: 1rem;
    margin-bottom: 3rem;
    padding-top: 1rem;
    max-width: 70%;
  }

  &__no-content {
    min-height: 58vh;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;

    &--title {
      font-size: 2rem;
    }

    &--message {
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
