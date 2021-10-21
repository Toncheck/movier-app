<template>
  <li class="item">
    <div class="item__left-box">
      <img
        v-if="!!imagePath"
        :src="imagePath"
        class="item__photo"
        alt="Movie cover"
      />
      <img v-else src="../../assets/img/no-poster.png" class="item__photo" />
    </div>
    <div class="item__data">
      <p class="item__popularity">Popularity: {{ popularityFixed }}</p>
      <h3 class="item__title">{{ title }}</h3>
      <small class="item__summary">{{ summary }}</small>
      <router-link
        v-if="id"
        :to="pagePath"
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
      /*  testId: 234567, */
      itemId: this.id,
    };
  },
  methods: {
    //metoda koja služi za pospremanje podatka o tome koji je id itema na kojem je kliknuto next. To je potrebno kako bi se mogao pronaći media_type i onda kasnije kreirati path za fetch s API-ja
    saveDetailsAboutRecord() {
      //spremi id na vuex
      this.$store.dispatch("content/saveDetailsAboutRecord", {
        itemId: this.id,
        mediaType: this.mediaType,
      });
    },
  },
  computed: {
    imagePath() {
      return `https://image.tmdb.org/t/p/w200${this.posterPath}`;
    },
    pagePath() {
      return `/details/${this.itemId}`;
    },
    popularityFixed() {
      return Math.round(this.popularity * 10) / 10;
      /* Ovo neće raditi */
      /* return this.popularity.toFixed(1); */
    },
  },
};
</script>

<style lang="scss">
.item {
  display: flex;
  /* flex: 0 0 90%; */
  padding: 2rem 0;
  border-top: 1px solid var(--color-grey-dark-3);
  justify-content: flex-start;
  align-items: center;

  &__left-box {
    min-width: 15rem;
  }

  &__photo {
    width: 13rem;
    height: auto;
    border-radius: 15px;
    margin-right: 1rem;
  }

  &__popularity {
    font-size: 0.8rem;
    color: var(--color-secondary-dark);
    text-transform: uppercase;
  }

  &__title {
    margin-bottom: 0.5rem;
  }

  &__summary {
    display: block;
  }
}
</style>
