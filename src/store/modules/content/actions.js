export default {
  //ACTION za dobavu podataka nakon searcha u SearchBar
  //Kontaktiraj API, preuzmi podatke i spremi ih na VUEX
  async saveContent(context, data) {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=5aa3aebfde739945a9abfed69db8db6d&language=en-US&query=${data.search}&page=${data.page}&include_adult=false`,
      { method: "GET" }
    );

    const responseData = await response.json();

    if (!response.ok) {
      //error ...
    }

    console.log({ ...responseData });

    //raspakiraj podatke dobivene s API-ja
    const { page, results, total_pages } = responseData;

    /* console.log(total_results); */
    //kreiraj tri seta podataka koji će poslje služiti za spremanje podataka po različitim ključevima

    const moviesById = {};
    const moviesByPage = {};
    const filters = {};

    console.log(moviesByPage);
    console.log(moviesByPage.page);
    console.log(moviesByPage[page]);

    // for (const movie of results)
    results.forEach((movie) => {
      moviesById[movie.id] = {
        title: movie.original_title,
        overview: movie.overview,
        popularity: movie.popularity,
        posterPath: movie.poster_path,
        mediaType: movie.media_type,
      };

      moviesByPage[page] = moviesByPage[page] || [];
      /* if (!moviesByPage[page]) {
        moviesByPage[page] = [];
      } */
      moviesByPage[page].push(movie.id);

      /* filters je prazan Object koji će se puniti s informacijama o različitim media_typeovima i prema tome za svaki film. movie ili tv kreira object koji ima dva propertyja: checked i listuId-jeva za filmove koji su pod tim media_typeom. Parametar checked se promijenit kako se klikne na filter.  */
      filters[movie.media_type] = filters[movie.media_type] || {};
      filters[movie.media_type].checked = true;
      filters[movie.media_type].movieIds =
        filters[movie.media_type].movieIds || [];
      filters[movie.media_type].movieIds.push(movie.id);
    });

    console.log(filters);
    // Spremi podatke u tri različita Objecta
    context.commit("saveMoviesById", moviesById);
    context.commit("saveMoviesByPage", moviesByPage);
    context.commit("saveFilters", filters);

    //Spremi podatake o trenutnoj stranici za paginaciju
    context.commit("saveCurrentPage", +Object.keys(moviesByPage));

    //Spremi podatke o ukupnom broju stranica za paginaciju
    context.commit("saveTotalPages", total_pages);

    //Spremi podatak o trenutnom searchu
    context.commit("saveCurrentSearch", data.search);
  },

  // Action za updejtanje filtera
  updateFilters(context, data) {
    context.commit("updateFilters", data);
  },

  /* Action za pospremanje id-a za detailsPage*/
  saveDetailsAboutRecord(context, data) {
    context.commit("saveDetailsAboutRecord", data);
  },

  /* Action za fetch podataka za details page */
  async loadContentDetails(context, data) {
    const response = await fetch(
      `https://api.themoviedb.org/3/${data.mediaType}/${data.itemId}?api_key=5aa3aebfde739945a9abfed69db8db6d&language=en-US`,
      { method: "GET" }
    );

    const responseData = await response.json();

    if (!response.ok) {
      //error ...
    }

    /* console.log({ ...responseData }); */

    const movieLoadedDetails = { ...responseData };

    /* function selectSomeProperties(account) {
      return Object.keys(account).reduce(function(obj, k) {
        if (
          [
            "original_title",
            "overview",
            "popularity",
            "poster_path",
            "backdrop_path",
            "production_companies",
            "runtime",
            "vote_average",
            "media_type",
          ].includes(k)
        ) {
          obj[k] = account[k];
        }
        return obj;
      }, {});
    }
    const selectedProperties = selectSomeProperties(movieLoadedDetails); */
    /* console.log(JSON.stringify(selectedProperties)); */

    const movieDetails = {
      title: movieLoadedDetails.original_title,
      overview: movieLoadedDetails.overview,
      popularity: movieLoadedDetails.popularity,
      posterPath: movieLoadedDetails.poster_path,
      backdropPath: movieLoadedDetails.backdrop_path,
      productionCompanies: movieLoadedDetails.production_companies.map(
        (productionCompany) => productionCompany.name
      ),
      runtime: movieLoadedDetails.runtime,
      voteAverage: movieLoadedDetails.vote_average,
    };

    //Kako vraća typeof da je object
    /* console.log(typeof movieDetails.productionCompanies);
    console.log(movieDetails.mediaType); */

    context.commit("saveContentDetails", movieDetails);
  },

  //Action za resetiranje filtera
  resetFilter(context, data) {
    context.commit("resetFilter", data);
    context.commit("saveCurrentPage", null);
    context.commit("saveTotalPages", null);
    context.commit("saveCurrentSearch", "");
  },
};
