export default {
  //Transformiranje dobivenih podataka i uzimanje potrebnoga kako bi se moglo spremiti tamo gdje treba
  //pozivanje mutationa samo za spremanje u content
  async loadContent(context, data) {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=5aa3aebfde739945a9abfed69db8db6d&language=en-US&query=${data}&page=1&include_adult=false`,
      { method: "GET" }
    );

    const responseData = await response.json();

    if (!response.ok) {
      //error ...
    }

    /* const content = []; */
    /*
    for (const key in responseData) {
      const 
    } */
    /* const page = { ...responseData }.page;
    const totalPages = { ...responseData }.total_pages;
    const results = { ...responseData }.results;
    
    console.log(typeof responseData);
    console.log(page);
    console.log(totalPages);
    console.log(results); */

    console.log({ ...responseData });

    const { page, results, total_pages, total_results } = responseData;

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
      };

      /*  console.log(moviesByPage[page] || []); */
      moviesByPage[page] = moviesByPage[page] || [];
      /* if (!moviesByPage[page]) {
        moviesByPage[page] = [];
      } */
      moviesByPage[page].push(movie.id);

      filters[movie.media_type] = filters[movie.media_type] || {};
      filters[movie.media_type].checked = true;
      filters[movie.media_type].movieIds =
        filters[movie.media_type].movieIds || [];
      filters[movie.media_type].movieIds.push(movie.id);
    });
    console.log(page, results, total_pages, total_results);

    context.commit("saveMoviesById", moviesById);
    context.commit("saveMoviesByPage", moviesByPage);
    context.commit("saveFilters", filters);

    console.log("moviesByid:");
    console.log(moviesById);
    console.log("moviesByPage");
    console.log(moviesByPage);
    console.log("filters");
    console.log(filters);

    //Spremi lastSearch, a to je pojam koji je upisan u searchBar kako bi se mogao eventualno kasnije raditi fetch podataka iz ContentPagination componenta za nove stranice.
    //context.commit("saveLastSearch", data);

    //Spremi loadani sadržaj s API-ja na VUEX -> prepakirani responseData sa API-ja
    //context.commit("saveContent", data);
  },
  //pozivanje mutationa za spremanje id-a
  //pozivanje mutationa za spremanje ostalih podataka koji dođu ...

  ///////////////////////////////////////////////////////////////////////////////////////
  /* ACTION ZA UPDEJTANJE FILTERA NA VUEXU */

  updateFilters(context, data) {
    context.commit("updateFilters", data);
  },
};
