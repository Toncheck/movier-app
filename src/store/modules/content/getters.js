export default {
  content(state) {
    return state.content;
  },
  /* hasContent(state) {
    return state.content && state.content.length > 0;
  }, */

  getFilterNames(state) {
    return Object.keys(state.filters);
  },
  getMovies(state) {
    const movieIds = [];
    for (const filterValue of Object.values(state.filters)) {
      if (filterValue.checked) {
        movieIds.push(...filterValue.movieIds);
      }
    }
    //Kreće se po kreiranom movieIdS arrayu i vrati će novi array koji sadrži sve podatke o filmu s tim id-em
    return movieIds.map((movieId) => state.moviesById[movieId]);
  },
  hasMovies(state, getters) {
    const movies = getters.getMovies;
    return movies.length > 0;
  },
};
