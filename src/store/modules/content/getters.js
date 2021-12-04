export default {
  createFilterNames(state) {
    return state.activeFilters;
  },

  getCurrentContent(state) {
    return state.currentContent;
  },

  getFilteredCurrentContent(_, getters) {
    const activeFilters = getters.createFilterNames;

    const { results } = getters.getCurrentContent;

    const listOfActiveFilters = [];

    activeFilters.forEach((element, index) => {
      if (element.isActive) listOfActiveFilters[index] = element.mediaType;
    });

    const filteredCurrentContent = results.filter((obj) =>
      listOfActiveFilters.includes(obj.media_type)
    );

    return filteredCurrentContent;
  },

  hasContent(_, getters) {
    const originalContent = getters.getCurrentContent;
    return originalContent.results.length > 0;
  },

  createListOfPages(_, getters) {
    const originalContent = getters.getCurrentContent;

    const currentPage = originalContent.page;
    const totalPages = originalContent.total_pages;

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    } else if (currentPage <= 2 || currentPage >= totalPages - 1) {
      return [1, 2, 3, "...", totalPages - 2, totalPages - 1, totalPages];
    } else if (currentPage === 3) {
      return [1, 2, 3, 4, "...", totalPages - 1, totalPages];
    } else if (currentPage === totalPages - 2) {
      return [
        1,
        2,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    } else {
      return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      ];
    }
  },

  getCurrentPageNew(_, getters) {
    const originalContent = getters.getCurrentContent;
    return originalContent.page;
  },

  getMediaType(state) {
    return state.detailsAboutRecord.mediaType;
  },

  getCurrentSearch(state) {
    return state.currentSearch;
  },
};
