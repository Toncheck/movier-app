export default {
  ////////////////////////////////////////////////////////////////////////NEW//////////////////////////////////////////////////////////////////////////////////////////

  ////////// ACTION za dohvaćanje podataka prema searchu s API-ja

  async getContentAPI(context, data) {
    // Dohvati podatke s API-ja

    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=5aa3aebfde739945a9abfed69db8db6d&language=en-US&query=${data.search}&page=${data.page}&include_adult=false`,
      { method: "GET" }
    );

    const responseData = await response.json();

    if (!response.ok) {
      //error ...
    }

    // console.log(responseData);

    // Pozovi mutation koji sprema dohvaćene podatke na Vuex u currentContent Object
    context.commit("saveCurrentContent", responseData);

    // Pozovi mutation koji sprema dohvaćene podatke na Vuex u listu svih do sada dohvaćenih currentContenta za navedeni pojam
    context.commit("saveCurrentContentList", responseData);

    //Spremi podatak o trenutnom searchu
    context.commit("saveCurrentSearch", data.search);

    // Updejtaj podatak o trenutnoj stranici na Vuexu
    context.state.currentPage = +data.page;

    //Kreiranje liste svih filtera prema media_type za svaki rezultat iz results. Zadatkom je zadano postavljanje samo prvog na kojeg se naišlo u status iscActive: true.
    /* activeFilters na Vuex je predviđen ovakvog izgleda: [ {mediaType: "tv", isActive: true }, {mediaType: "movie", isActive: false}, {mediaType: "person", isActive: false}, ...] */
    context.dispatch("initializeFilters", responseData);
  },

  ////////// ACTION za updejtanje activeFilters

  updateFiltersNew(context, data) {
    context.commit("updateFiltersNew", data);
  },

  ////////// ACTION za provjeravanje je li sadržaj za odabrani page već downloadan u currentContentList ili nije. Ovisno o tome dispatcha jedan od dva actiona za dohvaćanje sadržaja..

  getNewContent(context, data) {
    const currentContentList = context.state.currentContentList;
    const downloadedPagesList = [];

    // Izvuci sve postojeće downloadane (prije otvorene) stranice iz currentContentList
    currentContentList.forEach((obj) => {
      downloadedPagesList.push(+obj.page);
    });
    // Ako je odabrani page već downloadan pozovi action za dohvaćanje sadržaja iu currentContentList
    if (downloadedPagesList.includes(data.page)) {
      console.log("getContentVuex");
      context.dispatch("getContentVuex", data);
    }

    // U suprotmome pozovi action za download sadržaja s API-ja za zahtijevani page
    else {
      console.log("getContentAPI");
      context.dispatch("getContentAPI", data);
    }
  },

  ////////// ACTION za dohvaćanje sadržaja s Vuex za već prije downloadani page

  getContentVuex(context, data) {
    const currentContentList = context.state.currentContentList;
    // Dohvati sadržaj iz currentContentList i pospremi ga u currentContent kako bi se mogao prikazati
    // console.log("currentContentList", currentContentList);
    // console.log(+data.page);

    const newCurrentData = currentContentList.find(
      (obj) => obj.page === data.page
    );

    // Osvježi current Content

    context.commit("saveCurrentContent", newCurrentData);
    // console.log(newCurrentData);

    context.dispatch("initializeFilters", newCurrentData);

    // Updejtaj podatak o trenutnoj stranici na Vuexu
    context.state.currentPage = +data.page;
    console.log("getContentVuex", context, data);
  },

  ////////// ACTION za inicijalizaciju filtera

  initializeFilters(context, data) {
    //Raspakiraj results
    const { results } = data;
    //Kreiraj prazan Array
    const filters = [];

    //Izvuci media_type od svakog rezultata(itema)
    results.forEach((item) => {
      filters.push(item.media_type);
    });

    // Izvuci uniqe vrijednosti
    const uniqeFilters = [...new Set(filters)];

    //Kreiraj Array u kojem će biti za prvi element isActive = true, a za ostale false
    const filtersFirstActive = [];
    uniqeFilters.forEach((item, index) => {
      filtersFirstActive[index] = filtersFirstActive[index] || {};
      filtersFirstActive[index].mediaType = item;
      filtersFirstActive[index].isActive = false;
      filtersFirstActive[0].isActive = true;
    });

    // Pozovi mutation za spremanje novog stanja na Vuexu
    context.commit("initializeActiveFilters", filtersFirstActive);
    //
  },

  ////////// ACTION za fetch podataka za details page
  async loadContentDetails(context, data) {
    const response = await fetch(
      `https://api.themoviedb.org/3/${data.mediaType}/${data.itemId}?api_key=5aa3aebfde739945a9abfed69db8db6d&language=en-US`,
      { method: "GET" }
    );

    const responseData = await response.json();

    if (!response.ok) {
      //error ...
    }

    const movieLoadedDetails = { ...responseData };

    const movieDetails = {
      title:
        movieLoadedDetails.original_title || movieLoadedDetails.original_name,
      overview: movieLoadedDetails.overview,
      popularity: movieLoadedDetails.popularity,
      posterPath: movieLoadedDetails.poster_path,
      backdropPath: movieLoadedDetails.backdrop_path,
      productionCompanies:
        movieLoadedDetails.production_companies?.map(
          (productionCompany) => productionCompany.name
        ) || [],
      runtime: movieLoadedDetails.runtime,
      voteAverage: movieLoadedDetails.vote_average,
    };

    context.commit("saveContentDetails", movieDetails);
  },

  ////////// ACTION za resetiranje filtera
  resetFilter(context, data) {
    //DA
    context.commit("resetFilter", data);
    context.commit("saveCurrentSearch", "");
    context.commit("saveCurrentContent", {
      page: null,
      results: [],
      total_results: null,
      total_pages: null,
    });
  },

  ////////// ACTION za pospremanje id-a za detailsPage
  saveDetailsAboutRecord(context, data) {
    context.commit("saveDetailsAboutRecord", data);
  },

  ///// URL QUERY
  ////////// ACTION za provjeru je li load sadržaja došao zbog promjene stranice
  /* checkIfNewPage(context, data) {
    if (context.state.currentPage !== +data.page) {
      // console.log("Nova stranica nakon loaded");
      context.dispatch("getNewContent", data);
    } else {
      // console.log("Nije nova stranica nakon loaded");
      return;
    }
  }, */
  ///// URL QUERY

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
