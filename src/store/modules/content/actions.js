export default {
  //Transformiranje dobivenih podataka i uzimanje potrebnoga kako bi se moglo spremiti tamo gdje treba
  //pozivanje mutationa samo za spremanje u content
  async saveContent(context, data) {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=5aa3aebfde739945a9abfed69db8db6d&language=en-US&query=${data}&page=1&include_adult=false`,
      { method: "GET" }
    );

    const responseData = await response.json();

    if (!response.ok) {
      //error ...
    }

    console.log(typeof responseData);
    console.log({ ...responseData });

    context.commit("saveContent", data);
  },
  //pozivanje mutationa za spremanje id-a
  //pozivanje mutationa za spremanje ostalih podataka koji dođu ...
};
