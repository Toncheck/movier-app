import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      currentContent: {
        page: null,
        results: [],
        total_results: null,
        total_pages: null,
      },

      currentContentList: [],

      activeFilters: [],

      detailsAboutRecord: {},

      currentPage: 1,
      currentSearch: "",
    };
  },
  mutations,
  actions,
  getters,
};
