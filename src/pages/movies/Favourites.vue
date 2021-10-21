<template>
  <div class="favourites">
    <ul v-if="hasContent" class="favourites__list">
      <contents-item
        v-for="(value, record) in favourites"
        :key="+record"
        :id="+record"
        :posterPath="value.posterPath"
        :popularity="value.popularity"
        :title="value.title"
        :summary="value.overview"
        :mediaType="value.mediaType"
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
  data() {
    return {
      favourites: null,
    };
  },

  computed: {
    hasContent() {
      //provjeri ima li kakvog sadržaja u listi za favourites
      return JSON.parse(localStorage.getItem("favourites")) || {};
    },
  },

  methods: {
    loadFavourites() {
      //dohvati object movies s local storage
      /* const record = JSON.parse(localStorage.getItem("869250")); */
      this.favourites = JSON.parse(localStorage.getItem("favourites")) || {};
      console.log(typeof this.favourites);
      console.log(this.favourites);

      //prepakiravanje podataka
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
