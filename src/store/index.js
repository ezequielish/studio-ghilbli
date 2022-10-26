
import Vue from "vue"
import Vuex from "vuex"
import filmsStore from "./modules/filmsStore"
import authStore from "./modules/authStore"
import userStore from "./modules/userStore"
Vue.use(Vuex)
export default () => new Vuex.Store({

  modules: {
    filmsStore,
    authStore,
    userStore
  },

})

