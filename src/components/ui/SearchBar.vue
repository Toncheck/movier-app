<template>
  <!-- Block = search, Element = input -->
  <!-- SEARCH BAR -->
  <div>
    <form @submit.prevent="submitForm" class="search">
      <input
        type="text"
        class="search__input"
        :class="{ invalid: !searchInput.isValid }"
        placeholder="Type to search"
        id="searchinput"
        v-model.trim="searchInput.value"
        autocomplete="off"
        @blur="clearValidity('searchInput')"
      />
      <button class="search__button">
        <svg class="search__icon">
          <use xlink:href="@/assets/img/sprite.svg#icon-magnifying-glass"></use>
        </svg>
      </button>
    </form>
  </div>
  <p class="search__warning" v-if="!formIsValid">
    Please fix the term you entered and search again!
  </p>
</template>

<script>
export default {
  data() {
    return {
      searchInput: {
        value: "",
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
      if (this.searchInput.value === "") {
        this.searchInput.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      /* Validacija unesenog pojma */
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      /* Pozovi action za dohvaćanje podataka s API-ja te izbriši search pojam*/

      const searchData = {
        search: this.searchInput.value,
        page: 1,
      };

      /* NEW -> dispatchaj action koji vuče podatke s API-ja*/
      // this.$store.dispatch("content/getContentAPI", searchData);

      // Resetiraj data na Vuexu jer se napravio novi search

      this.$store.dispatch("content/resetFilter", []);

      // Resetiraj input
      this.searchInput.value = "";

      /*Nakon što je napravljen dispatch podataka skoči natrag na home page kako bi se podaci mogli vidjeti. Search Bar je korišten od dvije stranice pa je zato to potrebno, ako se slučajno nalazimo na favourites kako bismo se vratili na home gdje možemo vidjeti prikaz rezultata searcha. Korištenjem metode replace umjesto push se ne može skočiti natrag na stranicu na kojoj smo bili npr. favourites. Stvar preferencije koje koristiti*/

      // Korištenje query parametra kako bi se prenio podatak o loadanoj stranici
      // 1. Način je klasično preko patha
      // this.$router.replace("/home" + "?page=1");
      // 2. Način je preko nested Objecta za query parametar unutar Objecta za routing

      ///// URL QUERY
      this.$router.replace({
        name: "home",
        query: { search: searchData.search, page: 1 },
      });
      ///// URL QUERY
    },
  },
};
</script>

<style lang="scss" scoped>
///////////////////////////////////////////////////////////////////////
//SEARCH

type1 {
  margin-right: -2.25rem;
  margin-left: -1.25rem;
}

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

    &--full-width {
      width: 100%;
    }

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
