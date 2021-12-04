export default {
  saveCurrentContent(state, payload) {
    state.currentContent = payload;
  },

  saveCurrentContentList(state, payload) {
    state.currentContentList.push(payload);
  },

  resetCurrentContentList(state, payload) {
    state.currentContentList = payload;
  },

  initializeActiveFilters(state, payload) {
    state.activeFilters = payload;
  },

  updateFiltersNew(state, payload) {
    const index = state.activeFilters.findIndex(
      (obj) => obj.mediaType === payload.mediaType
    );

    state.activeFilters[index].isActive = payload.checked;
  },

  resetFilter(state, payload) {
    state.activeFilters = payload;
  },

  saveDetailsAboutRecord(state, payload) {
    state.detailsAboutRecord = payload;
  },

  saveCurrentSearch(state, payload) {
    state.currentSearch = payload;
  },
};
