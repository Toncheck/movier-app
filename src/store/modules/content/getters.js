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
  getContentTwo(state) {
    const movieIds = [];

    for (const filterValue of Object.values(state.filters)) {
      if (filterValue.checked) {
        movieIds.push(...filterValue.movieIds);
      }
    }

    //Kreće se po kreiranom movieIdS arrayu i vratit će novi array koji sadrži sve podatke o filmu s tim id-em. Ti podaci su title, overview, popularity i posterPath. -> NEDOSTAJE MI PODATAK O ID-u filma jer je on potreban svakom pojedinom itemu.
    //console.log(state.moviesById);
    //console.log(movieIds.map((movieId) => state.moviesById[movieId]));

    return movieIds.map((movieId) => state.moviesById[movieId]);
  },

  getContent(state) {
    //kreiraj prazan array koji će sadržavati samo movieIds za filmove koji su označeni filterom
    const movieIds = [];

    //Prolazak kroz sve values za objekt filters. Ako je filter checked = true tada se pusha u taj array za filter tog imena u movieIds = [];
    for (const filterValue of Object.values(state.filters)) {
      if (filterValue.checked) {
        movieIds.push(...filterValue.movieIds);
      }
    }
    // console.log(movieIds);
    /* console.log("========================");
    console.log(Object.keys(state.filters));
    console.log(Object.values(state.filters));
    console.log(Object.entries(state.filters));
    console.log("========================"); */

    const result2 = movieIds.map((movieId) => {
      return { id: movieId, ...state.moviesById[movieId] };
    });

    /* console.log(result2); */
    /* const result = state.moviesById.map((movie) => {
      const movieId = Object.keys(movie)[0];
      return { id: movieId, ...movie[movieId] };
    });
    */

    return result2;
  },

  hasContent(_, getters) {
    const movies = getters.getContent;
    return movies.length > 0;
  },

  getFilters(state) {
    return state.filters;
  },

  getContentDetails(state) {
    return state.contentDetails;
  },

  //Ovo ne treba, ali sam ostavio za postaviti pitanje: Zašto se to ne loada prilikom created
  /* loadDetailsId(state) {
    console.log(state.detailsId);
    return state.detailsId;
  }, */
};
