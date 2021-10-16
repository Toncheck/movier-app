export default {
  content(state) {
    return state.content;
  },
  hasContent(state) {
    return state.content && state.content.length > 0;
  },
};
