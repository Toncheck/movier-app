<template>
  <div class="details">
    <div class="details__box">
      <img
        src="https://image.tmdb.org/t/p/w200/kKG9gieki5wgEcVXLfnX1lbOcrO.jpg"
        class="details__photo"
        alt="Movie cover"
      />
      <small class="details__summary"
        >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque veniam
        porro et laudantium error. Vero cupiditate, eveniet suscipit ipsa totam
        cum excepturi veritatis, vitae id ducimus expedita eaque, illum
        dolorum?</small
      >
    </div>
    <div class="details__aside">
      <search-bar></search-bar>
      <div class="details__aside--small-box">
        <p class="details__additional-info">Popularity: 78.2</p>
      </div>

      <h5 class="details__production-companies">Production companies:</h5>
      <ul>
        <li class="details__list-item">Production company 1</li>
        <li class="details__list-item">Production company 2</li>
        <li class="details__list-item">Production company 3</li>
        <li class="details__list-item">Production company 4</li>
        <li class="details__list-item">Production company 5</li>
      </ul>
      <div class="details__aside--small-box">
        <h5 class="details__additional-info">Runtime</h5>
      </div>
      <ul>
        <li class="details__list-item">Production company 1</li>
        <li class="details__list-item">Production company 2</li>
        <li class="details__list-item">Production company 3</li>
        <li class="details__list-item">Production company 4</li>
        <li class="details__list-item">Production company 5</li>
      </ul>
      <div class="details__aside--small-box">
        <h5 class="details__additional-info">Vote average</h5>
      </div>

      <small class="item__summary">{{ summary }}</small>
    </div>
  </div>
</template>
<script>
import SearchBar from "../../components/ui/SearchBar.vue";

export default {
  components: {
    SearchBar,
  },
};
</script>

<style lang="scss" scoped>
.details {
  display: flex;
  max-width: 70%;
  margin: 0 auto;
  margin-top: 3rem;

  &__box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 70%;
  }

  &__photo {
    margin-bottom: 2rem;
  }

  &__aside {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    &--small-box {
      min-width: 75%;
      margin: 1rem 0;
    }
  }

  &__additional-info {
    display: block;
    padding: 0.6rem 0;
    font-size: 0.8rem;
    color: var(--color-secondary-dark);
    text-transform: uppercase;
    border-bottom: 1px solid var(--color-grey-dark-2);
  }

  &__production-companies {
    font-size: 1rem;
    color: var(--color-secondary-dark);
  }

  &__list-item {
    list-style: none;
    font-weight: 700;
  }
  &__summary {
    max-width: 60%;
  }
}
</style>
