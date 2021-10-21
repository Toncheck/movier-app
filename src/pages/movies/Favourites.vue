<template>
  <div class="favourites">
    <ul v-if="hasContent" class="favourites__list">
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
    <div v-else class="favourites__no-content">
      <h3 class="favourites__no-content--title">
        You do not have any faovurite saved.
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

  computed: {
    hasContent() {
      //provjeri ima li kakvog sadržaja u listi za favourites
      return this.$store.getters["content/hasContent"];
    },
  },

  methods: {
    loadFavourites() {
      const record = JSON.parse(localStorage.getItem("869250"));
      console.log(typeof record);
      console.log(record);
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
    padding-top: 1rem;
    max-width: 70%;
  }

  &__no-content {
    min-height: 58vh;
    /* text-align: center; */
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;

    &--title {
      font-size: 4rem;
      /* display: block; */
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
