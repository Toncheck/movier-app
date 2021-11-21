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

  ////////////////////////////////////////////////////////////////////////////////////////////////OLD//////////////////////////////////////////////////////////////////

  //ACTION za dobavu podataka nakon searcha u SearchBar
  //Kontaktiraj API, preuzmi podatke i spremi ih na VUEX
  /* async saveContent(context, data) {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=5aa3aebfde739945a9abfed69db8db6d&language=en-US&query=${data.search}&page=${data.page}&include_adult=false`,
      { method: "GET" }
    );

    const responseData = await response.json();

    if (!response.ok) {
      //error ...
    }

    // Podaci dođu u obliku
    // {page: 1,
    // results: [
    //     {
    //     "poster_path": null,
    //     "popularity": 1,
    //     "id": 24511,
    //     "overview": "",
    //     "backdrop_path": null,
    //     "vote_average": 0,
    //     "media_type": "tv",
    //     "first_air_date": "",
    //     "origin_country": ["GB"],
    //     "genre_ids": [],
    //     "original_language": "en",
    //     "vote_count": 0,
    //     "name": "Bradley",
    //     "original_name": "Bradley"
    //     },
    //     {...},
    //     {...}, ... ],
    // total_results: 382,
    // total_pages: 20
    // }

    const { page, results, total_pages } = responseData;

    // console.log(total_results);
    //kreiraj tri seta podataka koji će poslje služiti za spremanje podataka po različitim ključevima

    const moviesById = {};
    const moviesByPage = {};
    const filters = {};

    // for (const movie of results)
    results.forEach((movie) => {
      moviesById[movie.id] = {
        title: movie.original_title,
        overview: movie.overview,
        popularity: movie.popularity,
        posterPath: movie.poster_path,
        mediaType: movie.media_type,
      };

      // Stvori key imena prema pageu koji je dohvaćen. Ako taj key nema nikakvu vrijednost onda mu zadaj da je to prazna lista
      moviesByPage[page] = moviesByPage[page] || [];
      // if (!moviesByPage[page]) {
      //   moviesByPage[page] = [];
      // }
      // Dodaj id za prvi movie u gore kreirani Array
      moviesByPage[page].push(movie.id);

      // filters je prazan Object koji će se puniti s informacijama o različitim media_typeovima i prema tome za svaki film. movie ili tv kreira object koji ima dva propertyja: checked i listuId-jeva za filmove koji su pod tim media_typeom. Parametar checked se promijenit kako se klikne na filter.
      filters[movie.media_type] = filters[movie.media_type] || {};
      filters[movie.media_type].checked = true;
      filters[movie.media_type].movieIds =
        filters[movie.media_type].movieIds || [];
      filters[movie.media_type].movieIds.push(movie.id);
    });

    // Spremi podatke u tri različita Objecta
    // console.log(moviesById);
    // context.commit("saveMoviesById", moviesById);
    // console.log(moviesByPage);
    // context.commit("saveMoviesByPage", moviesByPage);
    //  console.log(filters);
    // context.commit("saveFilters", filters);

    //Spremi podatake o trenutnoj stranici za paginaciju
    context.commit("saveCurrentPage", +Object.keys(moviesByPage));

    //Spremi podatke o ukupnom broju stranica za paginaciju
    context.commit("saveTotalPages", total_pages);

    //Spremi podatak o trenutnom searchu
    context.commit("saveCurrentSearch", data.search);
  }, */
  ////////// ACTION za updejtanje filtera
  /* updateFilters(context, data) {
    context.commit("updateFilters", data);
  }, */

  //////////////////////////////////////////////////////////////UPDATED//////////////////////////////////////////////////////////////////////////////////////////////////

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

    console.log(responseData);

    const movieLoadedDetails = { ...responseData };

    console.log(movieLoadedDetails);
    console.log(movieLoadedDetails.original_title);
    console.log(
      movieLoadedDetails.production_companies.map(
        (productionCompany) => productionCompany.name
      )
    );

    const movieDetails = {
      title:
        movieLoadedDetails.original_title ||
        movieLoadedDetails.original_name ||
        "No data",
      overview: movieLoadedDetails.overview || "No data",
      popularity: movieLoadedDetails.popularity || "No data",
      posterPath: movieLoadedDetails.poster_path,
      backdropPath: movieLoadedDetails.backdrop_path,
      productionCompanies: movieLoadedDetails.production_companies.map(
        (productionCompany) => productionCompany.name
      ),
      runtime: movieLoadedDetails.runtime || "No data",
      voteAverage: movieLoadedDetails.vote_average || "No data",
    };

    console.log(movieDetails.productionCompanies);
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

  ////////// ACTION za provjeru je li load sadržaja došao zbog promjene stranice
  /* checkIfNewPage(context, data) {
    console.log(
      "stara stranica:",
      context.state.currentPage,
      "nova stranica",
      +data.page
    );
    if (context.state.currentPage !== +data.page) {
      console.log("Nova stranica nakon loaded");
      context.dispatch("getNewContent", data);
    } else {
      console.log("Nije nova stranica nakon loaded");
      // context.dispatch("getContentVuex", data);
      return;
    }
  }, */
};
