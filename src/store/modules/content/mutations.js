export default {
  ////////////////////////////////////////////////////////////////////NEW//////////////////////////////////////////////////////////////////////////////////////////////

  // Mutation za spremanje dohvaćenih podataka s API-ja u currentContent za trenutni search pojam
  saveCurrentContent(state, payload) {
    state.currentContent = payload;
  },

  // Mutation za spremanje dohvaćenih podataka u listu svih do sada dohvaćenih podataka s API-ja za currentContent za trenutni search pojam
  saveCurrentContentList(state, payload) {
    state.currentContentList.push(payload);
  },

  // Mutation za inicijalizaciju filtera. U početku je to samo prvi media_type koji je pronađen u responseData npr. activeFilters = [tv]
  initializeActiveFilters(state, payload) {
    state.activeFilters = payload;
  },

  // Mutation za update activeFilters prema onome što je kliknuto na pojedinom filteru u ContentFilter
  updateFiltersNew(state, payload) {
    /* console.log(payload); */
    /* console.log("activeFilters prije promjene: ", state.activeFilters); */

    // Nađi index za mediaType čiji se status promijenio
    const index = state.activeFilters.findIndex(
      (obj) => obj.mediaType === payload.mediaType
    );
    /* console.log(state.activeFilters[index]); */

    // Promijeni isActive status
    state.activeFilters[index].isActive = payload.checked;
    /* console.log("activeFilters nakon promjene: ", state.activeFilters); */
  },

  ////////////////////////////////////////////////////////////////////UPDATED//////////////////////////////////////////
  // Reset vrijednosti filtera prilikom klika na Search u Header page
  resetFilter(state, payload) {
    state.activeFilters = payload;
  },

  // Prilikom klika na Full Synopsis moraju bit spremljeni podaci o mediaType i itemId kako bi se mogao napraviti fetch za Details page
  saveDetailsAboutRecord(state, payload) {
    state.detailsAboutRecord = payload;
  },

  // Spremanje podataka koji se dobiju kao odgovor s API-ja nakon fetcha za Details page
  saveContentDetails(state, payload) {
    state.contentDetails = payload;
  },

  /////////////////////////////////////////////////////////////////////OLD/////////////////////////////////////////////////////////////////////////////////////////////
  //Mutation za spremanje podataka o itemima(filmovi, serije itd. u listu).
  /* saveContent(state, payload) {
    state.content.push(payload);
    //Ovdje ide push ako su podaci na state spremljeni kao lista
  }, */

  //Nikad korišteno
  /* saveLastSearch(state, payload) {
    state.lastSearch = payload;
  }, */

  /* saveMoviesById(state, payload) {
    state.moviesById = payload;
  }, */

  /* saveFilters(state, payload) {
    state.filters = payload;
  }, */

  /* saveMoviesByPage(state, payload) {
    state.moviesByPage = payload;
  },
 */
  /*  updateFilters(state, payload) {
    state.filters[payload.mediaType].checked = payload.checked;
  }, */

  //Pagination
  saveCurrentPage(state, payload) {
    state.currentPage = payload;
  },

  saveTotalPages(state, payload) {
    state.totalPages = payload;
  },

  saveCurrentSearch(state, payload) {
    state.currentSearch = payload;
  },
};
