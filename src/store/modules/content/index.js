import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      // Podaci za prikaz sadržaja, potrebno ih je inicijalizirati kako getters fukncije ne bi prilikom poziva bacale undefined
      // trenutno prikazani podaci
      currentContent: {
        page: null,
        results: [],
        total_results: null,
        total_pages: null,
      },
      // Lista svih trenutno prikazanih podataka za trenutni search
      currentContentList: [],

      // Podaci za filtriranje sadržaja
      /* Oblik podatkaa filters = [ { checked: "true", mediaType: "tv" }, {...}, {...}, ... ] */
      activeFilters: [],

      // Podaci o itemu potrebni za napravit fetch za Details page
      detailsAboutRecord: {},

      // Object podatka za details page
      contentDetails: {},

      // Podaci za paginaciju
      currentPage: 1,
      currentSearch: "",

      //dummy data
      /* content: [
        {
          id: "movie1",
          popularity: 40.3,
          title: "Being James Bond",
          summary:
            "Daniel Craig candidly reflects on his 15 year adventure as James Bond. Including never-before-seen archival footage from Casino Royale to the upcoming 25th film No Time To Die, Craig shares his personal memories in conversation with 007 producers, Michale G Wilson and Barbara Broccolli",
        },
        {
          id: "movie2",
          popularity: 23,
          title: "James Bond: For Real",
          summary:
            "The stunts and action set pieces for the 2006 James Bond adventure 'Casino Royale'",
        },
      ], */
    };
  },
  mutations,
  actions,
  getters,
};
