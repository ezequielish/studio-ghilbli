
import Vue from 'vue'
import Vuex from 'vuex'
import filmsStore from './modules/filmsStore'
Vue.use(Vuex)
const store = new Vuex.Store({
    
    modules:{
      filmsStore
    }, 

  })

  export default store;