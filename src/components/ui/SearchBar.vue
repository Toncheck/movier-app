<template>
  <!-- Block = search, Element = input -->
  <!-- SEARCH BAR -->
  <form @submit.prevent="submitForm" class="search">
    <input
      type="text"
      class="search__input"
      :class="{ invalid: !searchInput.isValid }"
      placeholder="Type to search"
      id="searchinput"
      v-model.trim.lazy="searchInput.val"
      @blur="clearValidity('searchInput')"
    />
    <button class="search__button">
      <svg class="search__icon">
        <use xlink:href="@/assets/img/sprite.svg#icon-magnifying-glass"></use>
      </svg>
    </button>
  </form>
  <p class="search__warning" v-if="!formIsValid">
    Please fix the term you entered and search again!
  </p>
</template>

<script>
export default {
  data() {
    return {
      searchInput: {
        val: "",
        isValid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      this.searchInput.isValid = true;
      if (this.searchInput.val === "") {
        this.searchInput.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }
      /*Nakon što je napravljen dispatch podataka skoči natrag na home page kako bi se podaci mogli vidjeti. Search Bar je korišten od dvije stranice pa je zato to potrebno, ako se slučajno nalazimo na favourites kako bismo se vratili na home gdje možemo vidjeti prikaz rezultata searcha. Korištenjem metode replace umjesto push se ne može skočiti natrag na stranicu na kojoj smo bili npr. favourites. Stvar preferencije koje koristiti*/

      const searchData = {
        search: this.searchInput.val,
        page: 1,
      };
      this.$store.dispatch("content/saveContent", searchData);
      this.$router.replace("/home");
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
    font-size: 1.1rem;
    background-color: var(--color-white);
    border: 1px solid var(--color-grey-dark-3);
    padding: 0.4rem 2rem;
    border-radius: 100px;
    width: 94%;
    transition: all 0.2s;
    margin-right: -2.25rem;
    margin-left: -1.25rem;

    &:-webkit-autofill,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:hover {
      box-shadow: 0 0 0 50px var(--color-white) inset;
      -webkit-box-shadow: 0 0 0 50px var(--color-white) inset; /* Change the color to your own background color */
      -webkit-text-fill-color: var(--color-black-dark-3);
    }

    &.invalid {
      border: 1px solid var(--color-secondary-dark);
    }

    &:focus {
      outline: none;
      /*    background-color: var(--color-white); */
    }

    &::-webkit-input-placeholder {
      font-weight: 100;
      color: var(color-grey-light-4);
    }
  }

  &__warning {
    color: var(--color-secondary-dark);
    text-align: center;
  }

  &__input:focus + &__button {
    background-color: var(--color-white);
  }

  &__button {
    border: none;
    background-color: var(--color-white);
    cursor: pointer;

    &:focus {
      outline: none;
    }

    &:active {
      transform: translateY(2px);
    }
  }

  &__icon {
    height: 1rem;
    width: 1rem;
    fill: var(--color-secondary-dark);
  }
}
</style>
