
import { SET_ALL_FILMS, FILMS_LOADING, LIKE_MOVIE, FILMS_ERROR, INPUT_SEARCH } from "../types/fimlsTypes"
const URL_ALL_MOVIES = "https://ghibliapi.herokuapp.com/films/";
const ERROR_DEFAULT = "Something went wrong, please try again later"

const store = {
  namespaced: true,
  state: {
    films: [],
    search_movie: "",
    loading_search: false,
    loading_films: false,
    error: ""
  },
  mutations: {
    SET_ALL_FILMS(state, payload) {
      state.films = payload
      state.error = ""
      state.loading_films = false

    },
    FILMS_LOADING(state, payload) {
      state.loading_films = payload
    },
    LIKE_MOVIE(state, payload) {
      if (localStorage.getItem(payload) === null) {
        localStorage.setItem(payload, true)
      } else {
        const like = JSON.parse(localStorage.getItem(payload));
        localStorage.setItem(payload, !like);

      }

    },
    FILMS_ERROR(state, payload) {
      state.error = payload
      state.loading_films = false

    },

    INPUT_SEARCH(state, payload) {
      state.loading_search = true
      state.search_movie = payload
      state.loading_search = false
    },
  },
  getters: {
    getFilm: state => id => {
      const film = state.films.filter(film => film.id == id)[0]
      return film
    },
    getMovieSearchState: state => value => {
      let expresion = new RegExp(`${value}.*`, "i");
      let moviesFilter = state.films.filter(film => expresion.test(film.title))
      let movieFive = []
      moviesFilter.map((film, i) => {
        if (i < 5) {
          movieFive.push(film)
        }

      })
      return movieFive

    }
  },
  actions: {
    async getAllFilmsApi({ commit }) {
      commit(FILMS_LOADING, true)
      try {
        const result = await fetch(URL_ALL_MOVIES);

        if (result.status == 403) {
          throw "unauthorized"
        }
        if (result.status == 400) {
          throw ERROR_DEFAULT
        }

        if (result.status == 404) {
          throw "Not Found"
        }
        const data = await result.json()

        commit(SET_ALL_FILMS, data)

      } catch (error) {
        // console.log(error);
        commit(FILMS_ERROR, error || ERROR_DEFAULT)
      }
    },
    likedMovie({ commit }, id) {
      commit(LIKE_MOVIE, id)
    },
    moviesILike() {
      let filmFavs = []

      store.state.films.map(film => {
        if (localStorage.getItem(`movie-${film.id}`) == "true") {
          filmFavs.push(film)
        }
      })
      return filmFavs
    },
    changeValueSearch({ commit }, value) {
      commit(INPUT_SEARCH, value)
    }
  },
}

export default store;