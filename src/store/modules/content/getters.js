export default {
  //////////////////////////////////////////////////////////////////////////////NEW//////////////////////////////////////////////////////////////////////////////////////

  ////////// Dohvati Array activeFilters
  createFilterNames(state) {
    return state.activeFilters;
  },

  ////////// Dohvati Object currentContent
  getCurrentContent(state) {
    return state.currentContent;
  },

  //////// Dohvatu Array currentContentList
  // getCurrentContentList(state) {
  //   console.log(state.currentContentList);
  //   return state.currentContentList;
  // },

  ////////// Filtriraj dohvaćeni sadržaj currentContent sukladno odabranim filterima na komponenti ContentFilter
  getFilteredCurrentContent(_, getters) {
    const activeFilters = getters.createFilterNames;

    const { results } = getters.getCurrentContent;

    const listOfActiveFilters = [];
    // Lista aktivnih filtera samo s njihovim mediaTypeom
    activeFilters.forEach((element, index) => {
      if (element.isActive) listOfActiveFilters[index] = element.mediaType;
    });

    const filteredCurrentContent = results.filter((obj) =>
      // idi po svakom rezultatu i provjeri sadrži li lista aktivnih filtera taj media_type
      listOfActiveFilters.includes(obj.media_type)
    );

    return filteredCurrentContent;
  },

  ////////// Provjeri ima li sadržaja za currentSearch
  hasContent(_, getters) {
    const originalContent = getters.getCurrentContent;
    return originalContent.results.length > 0;
  },

  createListOfPages(_, getters) {
    const originalContent = getters.getCurrentContent;

    // Varijable nužne za prikaz paginacije
    const currentPage = originalContent.page;
    const totalPages = originalContent.total_pages;

    // Lista stranica koje će se prikazati u ContentPaginatio

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1); // ovdje je stavljeno _ jer se element ne koristi u callback funkciji
    } else if (currentPage <= 2 || currentPage >= totalPages - 1) {
      return [1, 2, 3, "...", totalPages - 2, totalPages - 1, totalPages];
    } else if (currentPage === 3) {
      return [1, 2, 3, 4, "...", totalPages - 1, totalPages];
    } else if (currentPage === totalPages - 2) {
      return [
        1,
        2,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    } else {
      return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      ];
    }
  },

  getCurrentPageNew(_, getters) {
    const originalContent = getters.getCurrentContent;
    return originalContent.page;
  },

  ////////// Dohvati mediaType kako bi se mogao napraviti fetch za Details page
  getMediaType(state) {
    return state.detailsAboutRecord.mediaType;
  },

  getContentDetails(state) {
    /*  console.log(state.contentDetails); */
    return state.contentDetails;
  },

  getCurrentSearch(state) {
    return state.currentSearch;
  },

  //////////////////////////////////////////////////////////////////////////////OLD//////////////////////////////////////////////////////////////////////////////////////

  /* content(state) {
    return state.content;
  }, */
  /* hasContent(state) {
    return state.content && state.content.length > 0;
  }, */

  //izvuci imena svih postojećih filtera s Vuex-a koliko god ih ima. Imena su jednaka keyevima.
  /*  getFilterNames(state) {
    return Object.keys(state.filters);
  }, */

  //izvuci sadržaj s vuexa
  /* getContentTwo(state) {
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
  }, */

  /* getContent(state) {
    //kreiraj prazan array koji će sadržavati samo movieIds za filmove koji su označeni filterom
    const movieIds = [];

    //Prolazak kroz sve values za objekt filters. Ako je filter checked = true tada se pusha u taj array za filter tog imena u movieIds = [];
    for (const filterValue of Object.values(state.filters)) {
      if (filterValue.checked) {
        movieIds.push(...filterValue.movieIds);
      }
    }
    // console.log(movieIds);
    // console.log("========================");
    // console.log(Object.keys(state.filters));
    // console.log(Object.values(state.filters));
    // console.log(Object.entries(state.filters));
    // console.log("========================");

    // Dohvati za sve id-eve koji su označeni filterom. Znači kreira se za svaki item Object u koji je izgleda id: 11331 , mediaType: 'movie', overview: 'DAniel Craig candidly reflects on his ...', popularity: 19.844, posterPath: '/ksfhadhlfasflasfasl', title: 'Being James Bond'. Upravo taj sadržaj će koristiti pozivanjem ovog gettersa koristiti Page home koji će te informacije kroz props slati komponenti ContentsItem koja služi za prikaz podataka o pojedinom Itemu.

    const result = movieIds.map((movieId) => {
      return { id: movieId, ...state.moviesById[movieId] };
    });

    //  console.log(result);

    // const result = state.moviesById.map((movie) => {
    //   const movieId = Object.keys(movie)[0];
    //   return { id: movieId, ...movie[movieId] };
    // });
   
    return result;
  }, */

  /* hasContent(_, getters) {
    const movies = getters.getContent;
    return movies.length > 0;
  }, */

  /*  getFilters(state) {
    console.log(state.filters);
    return state.filters;
  }, */
};
