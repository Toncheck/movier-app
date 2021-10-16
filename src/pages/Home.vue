<template>
  <content-list></content-list>
  <content-pagination></content-pagination>
</template>

<script>
import ContentList from "../components/content/ContentList.vue";
import ContentPagination from "../components/content/ContentPagination.vue";

export default {
  components: {
    ContentList,
    ContentPagination,
  },
};
</script>
