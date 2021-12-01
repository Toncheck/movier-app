<template>
  <div class="filter" v-if="hasFilters">
    <h2 class="filter__title">Filter your search!</h2>
    <div class="filter__box">
      <span
        class="filter__option"
        v-for="filter in filterNames"
        :key="filter.mediaType"
      >
        <input
          type="checkbox"
          class="filter__checkbox"
          :id="filter.mediaType"
          @change="setFilter"
          :checked="filter.isActive"
        />

        <label class="filter__label" :for="filter.mediaType">
          <span class="filter__button"></span>
          <div class="filter__text">{{ filter.mediaType }}</div>
        </label>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["change-filter"],
  /* data() {
    return {};
  }, */
  methods: {
    setFilter(event) {
      // Dohvati ime filtera čija je vrijednost promijenjena
      const inputId = event.target.id;

      //Ovo je za provjeravanje statusa nad kućicom ,je li izabrana
      const isActive = event.target.checked;

      /* const data = { [inputId]: isActive }; */

      const data = {
        mediaType: inputId,
        checked: isActive,
      };
      // Dispatchaj action i pošalji podatak oblika npr. {tv:true}
      this.$store.dispatch("content/updateFiltersNew", data);
    },
  },

  computed: {
    // Computed property za dobivanje svih mogućih filtera prema media_type u currentContent
    filterNames() {
      //promatraj koji su to sve filteri na vuexu npr. "movie", "tv", ... Koliko god ih ima v-for će proći kroz sve njih i prikazati ih
      return this.$store.getters["content/createFilterNames"];
    },

    hasFilters() {
      return this.filterNames.length > 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.filter {
  margin-top: 2rem;
  text-align: center;

  &__text {
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-size: 1rem;
  }

  &__box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  &__option {
    margin: 0.5rem 0;
    margin-right: 0.5rem;
    padding: 0.5rem 0;
    display: flex;
    cursor: pointer;
    min-width: 9%;
  }

  &__checkbox {
    opacity: 1;
    font-family: inherit;
    cursor: pointer;
    display: none;
  }

  &__button {
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
      height: 1.2rem;
      width: 1.2rem;
      border-radius: 3px;
      background-color: var(--color-secondary-dark);
      transform: translate(0.1rem, 0.1rem);
      opacity: 0;
      transition: opacity 0.2s;
    }
  }

  &__label {
    line-height: 1;
    display: flex;
    /* position: relative; */
    cursor: pointer;
    align-items: center;
  }

  &__checkbox:checked ~ &__label > &__button::after {
    opacity: 1;
  }
}
</style>
