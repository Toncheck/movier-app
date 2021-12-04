<template>
  <li class="item">
    <div class="item__left-box">
      <img
        v-if="!!posterPath"
        :src="imagePath"
        class="item__photo"
        alt="Movie cover"
      />
      <img v-else src="../../assets/img/no-poster.png" class="item__photo" />
    </div>
    <div class="item__data">
      <h5 class="item__popularity">Popularity: {{ popularityFixed }}</h5>
      <h3 class="item__title">{{ title }}</h3>
      <small class="item__summary">{{ summary }}</small>
      <router-link
        v-if="id"
        :to="pagePath"
        replace
        class="btn btn--orange"
        :id="id"
        :mediaType="mediaType"
        @click="saveDetailsAboutRecord"
        >Full synopsis<span>&gt;</span></router-link
      >
    </div>
  </li>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: false,
      default: null,
    },
    popularity: {
      type: Number,
      required: false,
      default: null,
    },
    title: {
      type: String,
      required: false,
      default: "",
    },
    summary: {
      type: String,
      required: false,
      default: "",
    },
    posterPath: {
      type: String,
      required: false,
      default: "",
    },
    mediaType: {
      type: String,
      required: true,
      default: "",
    },
  },
  data() {
    return {
      itemId: this.id,
    };
  },
  methods: {
    saveDetailsAboutRecord() {
      this.$store.dispatch("content/saveDetailsAboutRecord", {
        itemId: this.id,
        mediaType: this.mediaType,
      });
    },
  },
  computed: {
    imagePath() {
      return `https://image.tmdb.org/t/p/w500${this.posterPath}`;
    },
    pagePath() {
      return { name: "details", params: { id: this.itemId } };
    },
    popularityFixed() {
      return Math.round(this.popularity * 10) / 10;
    },
  },
};
</script>

<style lang="scss">
.item {
  display: flex;

  padding-top: 1rem;
  border-top: 1px solid var(--color-grey-dark-3);
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  @include respond(tab-port) {
    flex-direction: row;
    padding: 2rem 0;
  }

  &__data :not(:first-child) {
    margin-top: 0.5rem;
  }

  &__left-box {
    width: 50%;

    margin-bottom: 1rem;
    text-align: center;

    @include respond(tab-port) {
      width: 30%;
      min-width: 15rem;
    }

    @include respond(tab-port) {
      margin-bottom: 0;
    }
  }

  &__photo {
    width: 70%;
    height: auto;
    object-fit: cover;
    border-radius: 15px;
  }

  &__popularity {
    font-weight: 500;
    color: var(--color-secondary-dark);
    text-transform: uppercase;
  }

  &__title {
    font-weight: 900;
    font-size: 1.3rem;
  }

  &__summary {
    display: block;
  }
}
</style>
