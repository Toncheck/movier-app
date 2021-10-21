export default {
  //Mutation za spremanje podataka o itemima(filmovi, serije itd. u listu).
  saveContent(state, payload) {
    state.content.push(payload);
    //Ovdje ide push ako su podaci na state spremljeni kao lista
  },

  saveLastSearch(state, payload) {
    state.lastSearch = payload;
  },

  saveMoviesById(state, payload) {
    state.moviesById = payload;
  },

  saveFilters(state, payload) {
    state.filters = payload;
  },

  saveMoviesByPage(state, payload) {
    state.moviesByPage = payload;
  },

  updateFilters(state, payload) {
    state.filters[payload.mediaType].checked = payload.checked;
  },

  saveDetailsAboutRecord(state, payload) {
    state.detailsAboutRecord = payload;
    console.log(state.detailsAboutRecord);
  },

  saveContentDetails(state, payload) {
    state.contentDetails = payload;
  },

  resetFilter(state, payload) {
    state.filters = payload;
  },

  //Pagination
  saveCurrentPage(state, payload) {
    state.currentPage = payload;
  },

  saveTotalPages(state, payload) {
    state.totalPages = payload;
  },

  saveCurrentSearch(state, payload) {
    state.currentSearch = payload;
    console.log(state.currentSearch);
  },
};
