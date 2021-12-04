export default {
  getNewContent(context, data) {
    const currentContentList = context.state.currentContentList;
    const downloadedPagesList = [];

    currentContentList.forEach((obj) => {
      downloadedPagesList.push(+obj.page);
    });

    if (downloadedPagesList.includes(+data.page)) {
      console.log("getContentVuex");
      context.dispatch("getContentVuex", data);
    } else {
      console.log("getContentAPI");
      context.dispatch("getContentAPI", data);
    }
  },

  async getContentAPI(context, data) {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=5aa3aebfde739945a9abfed69db8db6d&language=en-US&query=${data.search}&page=${data.page}&include_adult=false`,
      { method: "GET" }
    );

    const responseData = await response.json();

    if (!response.ok) {
      //error ...
    }

    context.commit("saveCurrentContent", responseData);

    context.commit("saveCurrentContentList", responseData);

    context.commit("saveCurrentSearch", data.search);

    context.state.currentPage = +data.page;

    context.dispatch("initializeFilters", responseData);
  },

  getContentVuex(context, data) {
    const currentContentList = context.state.currentContentList;

    const newCurrentData = currentContentList.find(
      (obj) => obj.page === +data.page
    );

    context.commit("saveCurrentContent", newCurrentData);

    context.dispatch("initializeFilters", newCurrentData);

    context.state.currentPage = +data.page;
    console.log("getContentVuex", context, data);
  },

  initializeFilters(context, data) {
    const { results } = data;
    const filters = [];

    results.forEach((item) => {
      filters.push(item.media_type);
    });

    const uniqeFilters = [...new Set(filters)];

    const filtersFirstActive = [];
    uniqeFilters.forEach((item, index) => {
      filtersFirstActive[index] = filtersFirstActive[index] || {};
      filtersFirstActive[index].mediaType = item;
      filtersFirstActive[index].isActive = false;
      filtersFirstActive[0].isActive = true;
    });

    context.commit("initializeActiveFilters", filtersFirstActive);
  },

  updateFiltersNew(context, data) {
    context.commit("updateFiltersNew", data);
  },

  resetFilter(context, data) {
    context.commit("resetFilter", data);
    context.commit("saveCurrentSearch", "");
    context.commit("saveCurrentContent", {
      page: null,
      results: [],
      total_results: null,
      total_pages: null,
    });
    context.commit("resetCurrentContentList", []);
  },

  saveDetailsAboutRecord(context, data) {
    context.commit("saveDetailsAboutRecord", data);
  },

  async fetchContentDetails(context, data) {
    const response = await fetch(
      `https://api.themoviedb.org/3/${data.mediaType}/${data.itemId}?api_key=5aa3aebfde739945a9abfed69db8db6d&language=en-US`,
      { method: "GET" }
    );

    const responseData = await response.json();

    if (!response.ok) {
      //error ...
    }

    const movieLoadedDetails = { ...responseData };

    return movieLoadedDetails;
  },
};
