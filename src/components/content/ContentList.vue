<template>
  <ul v-if="hasContent" class="list">
    <contents-item
      v-for="record in content"
      :key="record.id"
      :id="record.id"
      :popularity="record.popularity"
      :title="record.title"
      :summary="record.summary"
    >
    </contents-item>
    <!-- <li v-for="record in content" :key="record.id">
      {{ record.title }}
    </li> -->
  </ul>
  <h3 v-else>No Content Found</h3>
</template>

<script>
import ContentsItem from "./ContentsItem.vue";
export default {
  components: { ContentsItem },
  computed: {
    content() {
      //module je namespaced tako da je u ["content/content"] prvi content namespaced name, a drugi content je ime gettersa
      return this.$store.getters["content/content"];
    },
    hasContent() {
      return this.$store.getters["content/hasContent"];
    },
  },
};
</script>

<style lang="scss">
.list {
  list-style: none;
  margin: auto;
  margin-top: 1rem;
  padding-top: 3rem;
  max-width: 70%;
}

.title {
  color: var(--color-primary);
}

.title-secondary {
  background-color: var(--color-secondary);
}
</style>
