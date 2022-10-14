
import Vue from "vue"
import Vuex from "vuex"
import filmsStore from "./modules/filmsStore"
import authStore from "./modules/authStore"
import userStore from "./modules/userStore"
Vue.use(Vuex)
const store = new Vuex.Store({

  modules: {
    filmsStore,
    authStore,
    userStore
  },

})

export default store;