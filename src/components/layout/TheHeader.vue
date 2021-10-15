<template>
  <header class="header">
    <!-- NAVIGATION -->
    <nav class="user-nav">
      <ul class="user-nav__list">
        <li class="user-nav__item">
          <router-link class="user-nav__link" to="/home" @click="reset"
            >Search</router-link
          >
        </li>
        <li class="user-nav__item">
          <router-link class="user-nav__link" to="/favourites"
            >My Favourites</router-link
          >
        </li>
      </ul>
    </nav>

    <div class="header-text">
      <p class="header-text__moto">We have it all!</p>
      <h1 class="header-text__title">Movie database</h1>
    </div>

    <!-- Block = search, Element = input -->
    <!-- SEARCH BAR -->
    <form action="#" class="search">
      <input type="text" class="search__input" placeholder="Type to search" />
      <button class="search__button">
        <svg class="search__icon">
          <use xlink:href="@/assets/img/sprite.svg#icon-magnifying-glass"></use>
        </svg>
      </button>
    </form>
  </header>
</template>

<style lang="scss">
///////////////////////////////////////////////////////////////////////
//HEADER

.header {
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  /* background-color: black; */
  background-color: none;
  background-image: linear-gradient(
    var(--color-grey-dark-1),
    var(--color-black-dark-3)
  );
  padding: 0 15%;
  /* flex-wrap: wrap; */

  /* & > * {
    flex: 0 0 100%;
  } */
}

///////////////////////////////////////////////////////////////////////
//USER NAV

.user-nav {
  /* background-color: chartreuse; */
  align-self: flex-end;

  &__list {
    display: flex;
    list-style: none;
    /* text-align: center; */
  }

  &__item {
    padding-top: 0.5rem;
  }

  &__link {
    display: inline-block;
    padding: 0.5rem 2rem;
    border-bottom: 1px solid var(--color-grey-dark-2);

    &:link,
    &:visited {
      color: var(--color-white);
      font-size: 1rem;

      text-decoration: none;
      text-transform: uppercase;
    }

    &:hover {
      border-bottom: 1px solid var(--color-secondary-dark);
    }
  }
}

///////////////////////////////////////////////////////////////////////
//HEADER TEXT

.header-text {
  &__moto {
    color: var(--color-secondary-light);
    text-transform: uppercase;
    font-size: 0.8rem;
  }

  &__title {
    color: var(--color-white);
  }
}

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
