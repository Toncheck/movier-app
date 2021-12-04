<template>
  <div v-if="isLoading" class="spinner-container">
    <base-spinner></base-spinner>
    <p class="spinner-message">Authenticating...</p>
  </div>

  <div v-else class="details">
    <div class="details__box">
      <div class="details__photo-box">
        <img :src="imagePath" class="details__photo" alt="Movie cover" />
      </div>
      <small class="details__summary">{{ overview }}</small>
    </div>
    <div class="details__aside">
      <div class="details__search"><search-bar></search-bar></div>

      <div class="details__aside--small-box">
        <h5 class="details__additional-info">Popularity: {{ popularity }}</h5>
      </div>

      <h6 class="details__production-companies">Production companies:</h6>
      <ul class="details__list">
        <li
          class="details__list-item"
          v-for="company in productionCompanies"
          :key="company"
        >
          {{ company.name }}
        </li>
      </ul>
      <div class="details__aside--small-box">
        <h5 class="details__additional-info">Runtime: {{ runtime }}</h5>
      </div>
      <div class="details__aside--small-box">
        <h5 class="details__additional-info">
          Vote average: {{ voteAverage }}
        </h5>
      </div>
      <button class="details__button" @click="saveToFavourite">
        Add to favourites
      </button>
    </div>
  </div>
</template>
<script>
import SearchBar from "../../components/ui/SearchBar.vue";
import BaseSpinner from "../../components/ui/BaseSpinner.vue";

export default {
  props: ["id"], // Ovaj prop dolazi iz Routera jer je tamo za ovu komponentu definirano props= true, što kaže Routeru da dynamic parameters moraju biti poslane komponenti kao dio props
  components: {
    SearchBar,
    BaseSpinner,
  },

  data() {
    return {
      fetchedData: {},
      isLoading: false,
    };
  },

  computed: {
    //ako nema posterPatha, loadaj zamjensu sliku iz assets
    imagePath() {
      /* const posterPath = this.$store.getters["content/getContentDetails"]
        .posterPath;

      return posterPath
        ? `https://image.tmdb.org/t/p/w500${posterPath}`
        : require(`../../assets/img/no-poster.png`); */

      return this.fetchedData
        ? `https://image.tmdb.org/t/p/w500${this.fetchedData.poster_path}`
        : require(`../../assets/img/no-poster.png`);
    },

    //computed property za svaki pojedini podatak zbog boljeg UX-a
    overview() {
      /* return (
        this.$store.getters["content/getContentDetails"].overview ||
        `Unfortunately we do not have overview data`
      ); */
      return (
        this.fetchedData.overview ||
        `Unfortunately we do not have overview data`
      );
    },

    popularity() {
      /* return Math.round(this.popularity * 10) / 10; */
      /* return (
        Math.round(
          this.$store.getters["content/getContentDetails"].popularity * 10
        ) / 10 || `No data`
      ); */
      return Math.round(this.fetchedData.popularity * 10) / 10 || `No data`;
    },

    productionCompanies() {
      // console.log(
      //   this.$store.getters["content/getContentDetails"].productionCompanies
      // );
      // Mora biti short circuiting inače konzola vrati error jer se sadržaj loada prije nego je fetchan
      /* const companies = [
        ...(this.$store.getters["content/getContentDetails"]
          .productionCompanies || []),
      ];

      return companies.length > 0 ? companies : ["No data"]; */
      /* return this.$store.getters["content/getContentDetails"]
        .productionCompanies; */

      const companies = [...(this.fetchedData.production_companies || [])];

      return companies.length > 0 ? companies : ["No data"];
    },

    runtime() {
      /*  let temp = this.$store.getters["content/getContentDetails"].runtime;
      return temp ? temp.toString() + ` M` : `No data`; */
      /* return this.$store.getters["content/getContentDetails"].runtime; */
      let temp = this.fetchedData.runtime;
      return temp ? temp.toString() + ` M` : `No data`;
    },

    voteAverage() {
      /* return (
        this.$store.getters["content/getContentDetails"].voteAverage ||
        "No data"
      ); */
      return this.fetchedData.vote_average || "No data";
    },

    /* contentDetails() {
      return this.$store.getters["content/getContentDetails"];
    }, */

    ////////// Dohvati pohranjeni mediaType s Vuexa kako bi se mogao napraviti fetch sadržaja za ovaj Details page
    mediaType() {
      return this.$store.getters["content/getMediaType"];
    },
  },
  methods: {
    /////////////////////////////////////////////NEW//////////////////////////////////
    async fetchContentDetails() {
      this.isLoading = true;

      const data = {
        itemId: this.id,
        mediaType: this.mediaType,
      };

      // Dispatchaj action koji radi fetch za details i sprema podatke na vuex
      const fetchedData = await this.$store.dispatch(
        "content/fetchContentDetails",
        data
      );

      console.log(fetchedData);

      this.fetchedData = fetchedData;

      this.isLoading = false;
    },

    //////////////////////////////////////////////OLD//////////////////////////////////
    ////////// Metoda za loadanje sadržaja za ovaj Details page
    /* loadContentDetails() {
      // Dohvati podatke o id-u itema i vrsti media typea potrebnima za napraviti fetch
      const data = {
        itemId: this.id,
        mediaType: this.mediaType,
      };

      // Dispatchaj action koji radi fetch za details i sprema podatke na vuex
      this.$store.dispatch("content/loadContentDetails", data);
    }, */

    //////////////////////////////////////////OLD BUT USED////////////////////////////
    ////////// Metoda za spremanje itema kao favoruite itema na storage u browser
    saveToFavourite() {
      // primjer dohvaćanja id-a preko props iz Routera, a moguće i preko this.$route.params.id
      const itemId = this.id;

      /* localStorage.setItem("333465", "James Bond: From Russia with Love"); */
      const expandedContentDetails = {
        ...this.fetchedData,
        mediaType: this.mediaType,
      };

      //Dohvati podatke s localStorage, ako nema ništa onda kreiraj novi prazni objekt u koji će se spremati budući podaci

      const record = JSON.parse(localStorage.getItem("favourites")) || {};

      const favourites = {
        ...record,
        [itemId]: expandedContentDetails,
      };

      // Spremi podatke na browser u local storage

      localStorage.setItem("favourites", JSON.stringify(favourites));
    },

    /* clearStorage() {
      localStorage.clear();
    }, */
  },

  created() {
    /*  this.loadContentDetails(); */
    this.fetchContentDetails();
  },
};
</script>

<style lang="scss" scoped>
.spinner-container {
  display: flex;
  flex-direction: column;
  margin-top: 10vh;
}

.spinner-message {
  text-align: center;
  color: var(--color-secondary-dark);
  margin-top: 10vh;
}

.details__aside::v-deep .search__input {
  width: 100%;
  font-size: 0.5rem;
}

.details {
  display: flex;
  flex-direction: column;
  max-width: 85%;
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom: 2rem;
  align-items: center;

  @include respond(phone-small) {
    max-width: 70%;
  }

  @include respond(tab-port) {
    flex-direction: row;
  }

  &__box {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    max-width: 100%;

    @include respond(tab-port) {
      max-width: 70%;
    }
  }

  &__photo-box {
    align-self: center;
    width: 100%;
    height: auto;
    margin-bottom: 1rem;

    @include respond(phone-small) {
      width: 80%;
    }

    @include respond(phone) {
      width: 55%;
    }

    /*  >900 */
    @include respond(tab-port) {
      width: 55%;
      height: auto;
    }
  }

  &__photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px;

    @include respond(tab-port) {
      width: 100%;
      height: 100%;
      /* object-fit: cover; */
    }
  }

  &__search {
    align-self: stretch;
  }

  &__aside {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 2rem;
    align-self: center;
    min-width: 100%;

    @include respond(phone-small) {
      min-width: 80%;
    }

    @include respond(tab-port) {
      max-width: 80%;
      min-width: 0;
      align-self: flex-start;
    }

    &--small-box {
      width: 100%;
      margin: 1rem 0;
    }
  }

  &__button {
    text-decoration: none;
    border: none;
    background: transparent;
    background-color: var(--color-secondary-dark);
    color: var(--color-white);
    width: 90%;
    height: 2rem;
    border-radius: 50px;
    text-transform: uppercase;
    cursor: pointer;
    font-size: 0.7rem;
    width: 100%;
  }

  &__additional-info {
    font-weight: 500;
    display: block;
    padding: 0.6rem 0;
    color: var(--color-secondary-dark);
    text-transform: uppercase;
    border-bottom: 1px solid var(--color-grey-dark-2);
  }

  &__production-companies {
    margin-bottom: 0.4rem;
    color: var(--color-secondary-dark);
  }

  &__list-item {
    font-weight: 700;

    &:not(:last-child) {
      margin-bottom: 0.3em;
    }
  }
  &__summary {
    padding-bottom: 1rem;

    @include respond(phone-small) {
      max-width: 80%;
    }

    @include respond(tab-port) {
      margin-bottom: 3rem;
    }
  }
}
</style>
