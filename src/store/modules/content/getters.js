export default {
  content(state) {
    return state.content;
  },
  /* hasContent(state) {
    return state.content && state.content.length > 0;
  }, */

  //izvuci imena svih postojećih filtera s vuex-a koliko god ih ima
  getFilterNames(state) {
    return Object.keys(state.filters);
  },

  //izvuci sadržaj s vuexa
  getContent(state) {
    const movieIds = [];
    //Zašto prolazak kroz value, a ne kroz key?
    /*  console.log(Object.keys(state.filters)); */
    // Zašto dva puta ispište na konzolu?
    /*  console.log(Object.values(state.filters)); */
    /* Zašto je ispis na konzolu u actions normalan, a u getters veli Proxy */
    console.log(state.filters);

    for (const filterValue of Object.values(state.filters)) {
      if (filterValue.checked) {
        movieIds.push(...filterValue.movieIds);
      }
    }
    console.log(movieIds);
    //Kreće se po kreiranom movieIdS arrayu i vratit će novi array koji sadrži sve podatke o filmu s tim id-em
    console.log(movieIds.map((movieId) => state.moviesById[movieId]));
    console.log(state.moviesById);
    return movieIds.map((movieId) => state.moviesById[movieId]);
  },

  hasContent(_, getters) {
    const movies = getters.getContent;
    return movies.length > 0;
  },
};
