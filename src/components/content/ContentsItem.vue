<template>
  <li class="item">
    <img src="#" class="item__photo" alt="Movie cover" />
    <div class="item__data">
      <p class="item__popularity">Popularity: {{ popularity }}</p>
      <h3 class="item__title">{{ title }}</h3>
      <small class="item__summary">{{ summary }}</small>
      <router-link to="/details" class="btn btn--orange"
        >Full synopsis <span>&gt;</span></router-link
      >
    </div>
  </li>
</template>

<script>
export default {
  props: ["id", "popularity", "title", "summary"],
};
</script>

<style lang="scss">
.item {
  display: flex;
  flex: 0 0 100%;
  padding: 2rem 0;
  border-top: 1px solid var(--color-grey-dark-3);

  &__data {
    /*  */
  }

  &__popularity {
    font-size: 0.8rem;
    color: var(--color-secondary-dark);
    text-transform: uppercase;
  }

  &__title {
    margin-bottom: 0.5rem;
  }

  &__summary {
    display: block;
  }

  /* &__btn:link {
  }

  &__btn::before {
    content: "";
    display: inline-block;
    height: 1rem;
    width: 1rem;
    margin-right: 0.7rem;

    background-image: url(../../assets/img/chevron-small-right.svg);
    background-size: cover;

    @supports (-webkit-mask-image: url()) or (mask-image: url()) {
      background-color: var(--color-secnodary-dark);
      -webkit-mask-image: url(../../assets/img/chevron-small-right.svg);
      -webkit-mask-size: cover;
      mask-image: url(../../assets/img/chevron-small-right.svg);
      mask-size: cover;
      background-image: none;
    }
  } */
}
</style>
