export default {
  //Mutation za spremanje podataka o itemima(filmovi, serije itd. u listu).
  saveContent(state, payload) {
    state.content.push(payload);
    //Ovdje ide push ako su podaci na state spremljeni kao lista
  },

  saveLastSearch(state, payload) {
    state.lastSearch = payload;
  },
};
