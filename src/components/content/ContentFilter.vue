<template>
  <div class="filter" v-if="data">
    <h2 class="filter__title">Filter your search!</h2>
    <div class="filter__box">
      <span class="filter__option" v-for="filter in filters" :key="filter">
        <input
          type="radio"
          class="filter__radio"
          :id="filter"
          @change="setFilter"
        />
        <span class="filter__radio-button"></span>
        <label for="dynamicallyset" class="filter__radio-label">
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
    };
  },
  methods: {
    showFilters() {
      /* return this.filters.push("movie", "actor", "tv"); */
      //Neki prop s listom filtera koji dođe iz stranice koja koristi filter (Home ili Favourites)
    },

    setFilter(event) {
      //Ovo je zu dobivanje id-a iz eventa
      const inputId = event.target.id;

      console.log(inputId);

      //Ovo je za provjeravanje statusa nad kućicom ,je li izabrana
      const isActive = event.target.checked;
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
    data() {
      /* return this.filters.length > 0 ? true : false; */
      //Ako je objekt filters veći od 0 stavi true, inače false. Ta informacija služi za prikaz cijelog filtera na stranici.
      return Object.keys(this.filters).length > 0 ? true : false;
    },
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
  &__radio {
    opacity: 1;
    font-family: inherit;
    cursor: pointer;
    /* display: none; */
  }

  &__radio-button {
    height: 1.5rem;
    width: 1.5rem;
    margin-right: 0.5rem;
    border: 1px solid var(--color-grey-dark-3);
    border-radius: 3px;
    display: inline-block;
    cursor: pointer;

    /* &::after {
      content: "";
      display: block;
      height: 1.1rem;
      width: 1.1rem;
      border-radius: 3px;
      background-color: var(--color-secondary-dark);
      transform: translate(0.1rem, 0.1rem);
      opacity: 0;
      transition: opacity 0.2s;
    } */
  }

  &__radio:checked + &__radio-label &__radio-button::after {
    opacity: 1;
  }

  &__radio-label {
    font-size: 1.4rem;
    line-height: 1;
    display: inline-block;
    /* position: relative; */
    cursor: pointer;
  }
}
</style>
