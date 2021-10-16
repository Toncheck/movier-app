export default {
  //Transformiranje dobivenih podataka i uzimanje potrebnoga kako bi se moglo spremiti tamo gdje treba
  //pozivanje mutationa samo za spremanje u content
  saveContent(context, data) {
    context.commit("saveContent", data);
  },
  //pozivanje mutationa za spremanje id-a
  //pozivanje mutationa za spremanje ostalih podataka koji dođu ...
};
