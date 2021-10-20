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

  saveDetailsId(state, payload) {
    state.detailsId = payload;
  },

  saveContentDetails(state, payload) {
    state.contentDetails = payload;
  },
};
