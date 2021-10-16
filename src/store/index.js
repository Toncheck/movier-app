import { createStore } from "vuex";

import contentModule from "./modules/content/index.js";

const store = createStore({
  //ovdje se daje ime modulu koje smo postavili namespaced u true i to je bitno za dohvaćanje gettersa
  modules: { content: contentModule },
});

export default store;
