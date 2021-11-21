<template>
  <section class="not-found">
    <h2 class="not-found__title">Page not found</h2>
    <p class="not-found__message">
      This page could not be found - maybe check out more about the app at
      <router-link class="not-found__link" to="/">Start Page</router-link>
    </p>
  </section>
</template>

<style lang="scss" scoped>
.not-found {
  text-align: center;
  color: var(--color-grey-dark-2);

  &__title {
    font-size: 2.5rem;
    margin: 5rem 0;
  }

  &__message {
    font-size: 1.2rem;
  }

  &__link {
    color: var(--color-secondary-dark);
    text-decoration: none;
  }
}
</style>
