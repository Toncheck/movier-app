export default {
  //Mutation za spremanje podataka o itemima(filmovi, serije itd. u listu)
  saveContent(state, payload) {
    state.content.push(payload);
  },
};
