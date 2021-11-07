<template>
  <div class="details">
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
          {{ company }}
        </li>
        <!-- <li class="details__list-item">Production company 2</li>
        <li class="details__list-item">Production company 3</li>
        <li class="details__list-item">Production company 4</li>
        <li class="details__list-item">Production company 5</li> -->
      </ul>
      <div class="details__aside--small-box">
        <h5 class="details__additional-info">Runtime: {{ runtime }}</h5>
      </div>
      <ul>
        <li class="details__list-item">ŠTO JE OVO?</li>
      </ul>
      <div class="details__aside--small-box">
        <h5 class="details__additional-info">
          Vote average: {{ voteAverage }}
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

    //ako nema posterPatha, loadaj zamjensu sliku iz assets
    imagePath() {
      const posterPath = this.$store.getters["content/getContentDetails"]
        .posterPath;

      return posterPath
        ? `https://image.tmdb.org/t/p/w500${posterPath}`
        : require(`../../assets/img/no-poster.png`);
    },

    //computed property za svaki pojedini podatak zbog boljeg UX-a
    overview() {
      return (
        this.$store.getters["content/getContentDetails"].overview ||
        `Unfortunately we do not have overview data`
      );
    },

    popularity() {
      /* return Math.round(this.popularity * 10) / 10; */
      return (
        Math.round(
          this.$store.getters["content/getContentDetails"].popularity * 10
        ) / 10 || [`No data`]
      );
    },

    productionCompanies() {
      const companies = [
        ...this.$store.getters["content/getContentDetails"].productionCompanies,
      ];

      return companies.length > 0 ? companies : ["No data"];
      /* return this.$store.getters["content/getContentDetails"]
        .productionCompanies; */
    },

    runtime() {
      let temp = this.$store.getters["content/getContentDetails"].runtime;
      return temp ? temp.toString() + `M` : `No data`;
      /* return this.$store.getters["content/getContentDetails"].runtime; */
    },

    voteAverage() {
      return (
        this.$store.getters["content/getContentDetails"].voteAverage ||
        "No data"
      );
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
/* .details__aside::v-deep h6 {
  background-color: red;
} */

.details__aside::v-deep .search__input {
  width: 100%;
  font-size: 0.5rem;
}

.details {
  display: flex;
  max-width: 70%;
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom: 2rem;

  &__box {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    max-width: 70%;
  }

  &__photo-box {
    align-self: center;
    width: 80%;
    height: auto;
    margin-bottom: 1rem;

    /*  >900 */
    @include respond(tab-port) {
      width: 50%;
      height: auto;
    }
  }

  &__photo {
    width: 100%;
    height: 100%;
    object-fit: cover;

    @include respond(tab-port) {
      width: 100%;
      height: 100%;
      object-fit: cover;
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
    max-width: 80%;
    padding-bottom: 1rem;
    margin-bottom: 3rem;
  }
}
</style>
