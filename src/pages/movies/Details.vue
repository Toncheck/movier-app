<template>
  <div class="details">
    <div class="details__box">
      <img :src="posterPath" class="details__photo" alt="Movie cover" />
      <small class="details__summary">{{ contentDetails.overview }}</small>
    </div>
    <div class="details__aside">
      <search-bar></search-bar>
      <div class="details__aside--small-box">
        <p class="details__additional-info">
          Popularity: {{ contentDetails.popularity }}
        </p>
      </div>

      <h5 class="details__production-companies">Production companies:</h5>
      <ul>
        <li
          class="details__list-item"
          v-for="company in contentDetails.productionCompanies"
          :key="company"
        >
          {{ company }}
        </li>
        <!-- <li class="details__list-item">Production company 2</li>
        <li class="details__list-item">Production company 3</li>
        <li class="details__list-item">Production company 4</li>
        <li class="details__list-item">Production company 5</li> -->
      </ul>
      <div class="details__aside--small-box">
        <h5 class="details__additional-info">
          Runtime: {{ contentDetails.runtime }}M
        </h5>
      </div>
      <ul>
        <li class="details__list-item">ŠTO JE OVO?</li>
      </ul>
      <div class="details__aside--small-box">
        <h5 class="details__additional-info">
          Vote average: {{ contentDetails.voteAverage }}
        </h5>
      </div>
      <button class="details__button" @click="saveToFavourite">
        Add to favourites
      </button>
      <!-- <button class="" @click="clearStorage">Clear Storage</button> -->
    </div>
  </div>
</template>
<script>
import SearchBar from "../../components/ui/SearchBar.vue";

export default {
  components: {
    SearchBar,
  },

  /* data() {
    return {};
  }, */

  computed: {
    //ovo ne radi
    /* detailsId() {
      return this.$store.getters.loadDetailsId;
    }, */

    posterPath() {
      const imagePath = this.$store.getters["content/getContentDetails"]
        .posterPath;

      return `https://image.tmdb.org/t/p/w200${imagePath}`;
    },

    contentDetails() {
      return this.$store.getters["content/getContentDetails"];
    },
    getFilters() {
      return this.$store.getters["content/getFilters"];
    },
    mediaType() {
      return this.$store.getters["content/getMediaType"];
    },
  },
  methods: {
    loadContentDetails() {
      const data = {
        itemId: this.$route.params.id,
        mediaType: this.mediaType,
      };

      //kao data šalje se id, prema tom id-u treba pronaći media_type koji određuje na koji endpoint se vrši upit, mogući su movie, tv ili person

      /* console.log(this.getFilters); */

      //Prolazak kroz sve vrijednosti za objekt filters. Ako je u određenom filteru pronađen id znači da imamo media_type

      //Ovo je bila prva ideja, uzeti media type iz filters. I to radi ako se na details page skoči s home gdje je su bili prikazani itemi. No ako se na details page skoči s favourites, a prije toga nijedan search nije bio napravljen, neće se moći dohvatiti media type. Zbog toga je potrebno utrpati i media type kao podatak koji putuje zajedno sa svim podacima o filmu.
      for (const [mediaType, filterValue] of Object.entries(this.getFilters)) {
        // console.log(filterValue.movieIds[0], typeof filterValue.movieIds[0]);
        if (filterValue.movieIds.includes(+data.itemId)) {
          data.mediaType = mediaType;
        }
      }

      //////////////////////////////////////////////////////////////

      this.$store.dispatch("content/loadContentDetails", data);
    },

    saveToFavourite() {
      const itemId = this.$route.params.id;

      /* localStorage.setItem("333465", "James Bond: From Russia with Love"); */
      const expandedContentDetails = {
        ...this.contentDetails,
        mediaType: this.mediaType,
      };

      //Dohvati podatke s localStorage, ako nema ništa onda kreiraj novi prazni objekt u koji će se spremati budući podaci

      const record = JSON.parse(localStorage.getItem("favourites")) || {};

      const favourites = {
        ...record,
        [itemId]: expandedContentDetails,
      };

      localStorage.setItem("favourites", JSON.stringify(favourites));
    },

    /* clearStorage() {
      localStorage.clear();
    }, */
  },

  created() {
    this.loadContentDetails();
  },
};
</script>

<style lang="scss" scoped>
.details {
  display: flex;
  max-width: 70%;
  margin: 0 auto;
  margin-top: 3rem;
  min-height: 70vh;

  &__box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 70%;
  }

  &__photo {
    margin-bottom: 2rem;
  }

  &__aside {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    &--small-box {
      min-width: 75%;
      margin: 1rem 0;
    }
  }

  &__button {
    text-decoration: none;
    border: none;
    background: transparent;
    /* font-size: 1rem; */
    background-color: var(--color-secondary-dark);
    color: var(--color-white);
    width: 90%;
    height: 3rem;
    border-radius: 50px;
    text-transform: uppercase;
    cursor: pointer;
  }

  &__additional-info {
    display: block;
    padding: 0.6rem 0;
    /* font-size: 0.8rem; */
    color: var(--color-secondary-dark);
    text-transform: uppercase;
    border-bottom: 1px solid var(--color-grey-dark-2);
  }

  &__production-companies {
    /* font-size: 1rem; */
    color: var(--color-secondary-dark);
  }

  &__list-item {
    list-style: none;
    font-weight: 700;
  }
  &__summary {
    max-width: 60%;
  }
}
</style>
