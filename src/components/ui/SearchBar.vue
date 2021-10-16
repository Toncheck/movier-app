<template>
  <!-- Block = search, Element = input -->
  <!-- SEARCH BAR -->
  <form @submit.prevent="submitForm" class="search">
    <input
      type="text"
      class="search__input"
      placeholder="Type to search"
      id="searchinput"
      v-model.trim.lazy="searchInput"
    />
    <button class="search__button">
      <svg class="search__icon">
        <use xlink:href="@/assets/img/sprite.svg#icon-magnifying-glass"></use>
      </svg>
    </button>
  </form>
</template>

<script>
export default {
  emits: ["save-data"],
  data() {
    return {
      searchInput: "",
    };
  },
  methods: {
    submitForm() {
      this.$emit("save-data", this.searchInput);
      console.log(this.searchInput);
    },
  },
};
</script>

<style lang="scss" scoped>
///////////////////////////////////////////////////////////////////////
//SEARCH

.search {
  /* background-color: blue; */
  /* align-self: center; */
  /* flex: 0 0 120px; */

  /* centriranje search bara */
  display: flex;
  align-items: center;
  justify-content: center;

  &__input {
    font-family: inherit;
    font-size: inherit;
    background-color: var(--color-grey-light-2);
    border: none;
    padding: 0.7rem 2rem;
    border-radius: 100px;
    width: 40%;
    transition: all 0.2s;
    margin-right: -3.25rem;

    &:focus {
      outline: none;
      width: 50%;
      background-color: var(--color-grey-light-3);
    }

    &::-webkit-input-placeholder {
      font-weight: 100;
      color: var(color-grey-light-4);
    }
  }

  &__input:focus + &__button {
    background-color: var(--color-grey-light-3);
  }

  &__button {
    border: none;
    background-color: var(--color-grey-light-2);

    &:focus {
      outline: none;
    }

    &:active {
      transform: translateY(2px);
    }
  }

  &__icon {
    height: 2rem;
    width: 2rem;
    fill: var(--color-secondary-dark);
  }
}
</style>
