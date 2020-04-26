
 import { GET_ALL_FILMS, FILMS_LOADING, LIKE_MOVIE, FILMS_ERROR, INPUT_SEARCH } from '../types/fimlsTypes'
 const URL_ALL_MOVIES = "https://ghibliapi.herokuapp.com/films/";
 


const store = {
    namespaced: true,
    state: {
        films: [],      
        movieSelected: {},
        search_movie: '',
        loading_search: false,
        loading_films: false,
        error: ''
    },
    mutations: {
        GET_ALL_FILMS (state, payload) {
        state.films = payload
      },
      FILMS_LOADING(state, payload){
        state.loading_films = payload
      },
      LIKE_MOVIE(state, payload){       
        if(localStorage.getItem(payload) === null){
            localStorage.setItem(payload,  true)            
        }else{
          const like = JSON.parse(localStorage.getItem(payload));
          localStorage.setItem(payload, !like);
          
        }

      },
      FILMS_ERROR(state, payload){
          state.error = payload
      },

      INPUT_SEARCH(state, payload){
          state.loading_search = true
          state.search_movie = payload
          state.loading_search = false
      },

    },
    getters: {
        getMovieState: state => id => {
          state.movieSelected = state.films.filter(film => film.id == id )[0]          
        },
        getMovieSearchState: state => value => {
          let expresion = new RegExp(`${value}.*`, "i");
          let moviesFilter = state.films.filter(film => expresion.test(film.title))
          let movieFive = []
              moviesFilter.map((film, i) => {
                  if(i < 5){
                     movieFive.push(film)
                  }
                 
              })
              return movieFive
    
        }
    },
    actions: {
        async getAllFilmsApi({ commit }){
            commit(FILMS_LOADING, true)
            try {
              const result = await fetch(URL_ALL_MOVIES);
          
              const data = await result.json()             
              commit(GET_ALL_FILMS, data)
              commit(FILMS_LOADING, false)
            
            } catch (error) {
              // console.log(error);
              commit(FILMS_ERROR, 'Algo ha salido mal, intente mas tarde')
              commit(FILMS_LOADING, false)
            }
        },
        likedMovie({commit}, id){
          commit(LIKE_MOVIE, id)     
        },
        moviesILike(){
          let filmFavs = []         
          
          store.state.films.map(film => {            
            if(localStorage.getItem(`movie-${film.id}`) == 'true'){
              filmFavs.push(film)                       
            }
          })        
          return filmFavs
        },
        changeValueSearch({commit}, value){
            commit(INPUT_SEARCH, value)
        }
    },
}

export default store;