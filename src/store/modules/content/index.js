import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      //////////////////////////////////////////////////////////////////////////////////NEW////////////////////////////////////////////////////////////////////////////

      // Podaci za prikaz sadržaja
      currentContent: {},
      currentContentList: [],

      // Podaci za filtriranje sadržaja
      activeFilters: [],

      // Podaci za paginaciju

      ///////////////////////////////////////////////////////////////////////////////////OLD///////////////////////////////////////////////////////////////////////////
      detailsAboutRecord: {},

      //setovi podataka za home page
      moviesById: {},
      filters: {},
      moviesByPage: {},
      //set podatka za details page
      contentDetails: {},

      //Pagination

      currentPage: null,
      totalPages: null,
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
