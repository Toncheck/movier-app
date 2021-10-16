<template>
  <ul v-if="hasContent">
    <li v-for="record in content" :key="record.id">
      {{ record.title }}
    </li>
  </ul>
  <h3 v-else>No Content Found</h3>
</template>

<script>
export default {
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
.title {
  color: var(--color-primary);
}

.title-secondary {
  background-color: var(--color-secondary);
}
</style>
