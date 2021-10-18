<template>
  <div class="filter" v-if="data">
    <h2 class="filter__title">Filter your search!</h2>
    <div class="filter__box">
      <span class="filter__option" v-for="filter in filterNames" :key="filter">
        <input
          type="checkbox"
          class="filter__checkbox"
          :id="filter"
          @change="setFilter"
          checked
        />
        <span class="filter__checkbox-button"></span>
        <label for="dynamicallyset" class="filter__checkbox-label">
          {{ filter }}</label
        >
      </span>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["change-filter"],
  data() {
    return {
      filters: { none: true, test: true },
      // filters: { movie: { checked: true, ids: [869250, ...] }, tv: { checked: true, ids: [...] } }
      // moviesById: { 869250: {}
    };
  },
  methods: {
    initializeFilters() {
      /* return this.filters.push("movie", "actor", "tv"); */
      //Neki prop s listom filtera koji dođe iz stranice koja koristi filter (Home ili Favourites)
    },

    setFilter(event) {
      //Ovo je zu dobivanje id-a iz eventa
      const inputId = event.target.id;

      console.log(inputId);

      //Ovo je za provjeravanje statusa nad kućicom ,je li izabrana
      const isActive = event.target.checked;
      console.log(isActive);
      //Ovo je za update filtera
      const updatedFilters = {
        //Ovo kopira sve propertyje iz objekta
        ...this.filters,
        //ovo overwrite property preko keya, a key je ono što je spremljeno u inputId
        [inputId]: isActive,
      };
      //Update filtera
      this.filters = updatedFilters;
      //emitiranje eventa kako bi komponenta koja koristi <task-filter></task-filter> mogla znati da je došlo do promjene. U ovom slučaju će to koristiti Account.vue component. Ono što emitamo jesu podaci updatedFilters za event change-filter
      this.$emit("change-filter", updatedFilters);
    },
  },
  computed: {
    filterNames() {
      return this.$store.getters["content/getFilterNames"];
    },
    data() {
      /* return this.filters.length > 0 ? true : false; */
      //Ako je objekt filters veći od 0 stavi true, inače false. Ta informacija služi za prikaz cijelog filtera na stranici.
      return Object.keys(this.filters).length > 0 ? true : false;
    },
    //Ovaj filterend content je reducirani objekt koji pokazuje samo podatke koji zadovoljavaju filter postavljen na trenutnoj stranici
    /* filteredContent() {
      const content = this.$store.getters["content/content"];
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes("frontend")) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes("backend")) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes("career")) {
          return true;
        }
        return false;
      });
    },*/
  },
};
</script>

<style lang="scss" scoped>
.filter {
  margin-top: 2rem;
  text-align: center;

  &__title {
    font-size: 1.6rem;
  }

  &__box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    //Zašto mi ovo ne radi ovaj selektor?
    /* &:not(:last-child) {
      margin-right: 0.5rem;
    } */
  }

  &__option {
    margin: 0.5rem 0;
    margin-right: 0.5rem;
    padding: 0.5rem 0;
    display: inline-flex;
    cursor: pointer;
    /* position: relative; */
  }
  &__checkbox {
    opacity: 1;
    font-family: inherit;
    cursor: pointer;
    /* display: none; */
  }

  &__checkbox-button {
    height: 1.5rem;
    width: 1.5rem;
    margin-right: 0.5rem;
    border: 1px solid var(--color-grey-dark-3);
    border-radius: 3px;
    display: inline-block;
    cursor: pointer;

    &::after {
      content: "";
      display: block;
      height: 1.1rem;
      width: 1.1rem;
      border-radius: 3px;
      background-color: var(--color-secondary-dark);
      transform: translate(0.1rem, 0.1rem);
      opacity: 1;
      transition: opacity 0.2s;
    }
  }

  &__checkbox-label {
    font-size: 1.4rem;
    line-height: 1;
    display: inline-block;
    /* position: relative; */
    cursor: pointer;
  }

  /* &__checkbox:checked + &__checkbox-label &__checkbox-button::after {
    opacity: 1;
  } */
}
</style>
