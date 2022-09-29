
import Vue from "vue"
import Vuex from "vuex"
import filmsStore from "./modules/filmsStore"
import authStore from "./modules/authStore"

Vue.use(Vuex)
const store = new Vuex.Store({

  modules: {
    filmsStore,
    authStore
  },

})

export default store;