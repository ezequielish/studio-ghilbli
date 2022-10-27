
import {
  SET_ALL_FILMS,
  FILMS_LOADING,
  LIKE_MOVIE,
  FILMS_ERROR,
  INPUT_SEARCH,
  ERROR_COMMETS,
  LOADING_COMMETS,
} from "../types/fimlsTypes"
const URL_ALL_MOVIES = "https://ghibliapi.herokuapp.com/films/";
const URL_COMMENTS_FILM = process.env.baseUrl + "/comment";
const ERROR_DEFAULT = "Something went wrong, please try again later"

const store = {
  namespaced: true,
  state: {
    films: [],
    search_movie: "",
    loading_search: false,
    loading_films: false,
    error: "",
    error_comments: "",
    loading_comment: false,
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
    LOADING_COMMETS(state, payload) {
      state.loading_comment = payload
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
    ERROR_COMMETS(state, payload) {
      state.error_comments = payload
      state.loading_comment = false
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
    getIndexFilm: state => id => {

      let indexFilm = state.films.map((film, i) => film.id == id && i + 1).filter(v => v != false)

      indexFilm = (indexFilm.length > 0 || indexFilm[0] === 0) && indexFilm[0]
      return (indexFilm - 1)
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
    async deleteComment({ commit, getters, state }, params) {

      try {

        const headers = new Headers();
        if (window.localStorage.getItem("user_sg_token") != null) {
          headers.append("Authorization", `Bearer ${window.localStorage.getItem("user_sg_token")}`);
        }

        const result = await fetch(`${URL_COMMENTS_FILM}/${params.idComment}`, {
          method: "DELETE",
          headers: headers
        });
        const dataJson = await result.json();

        if (dataJson.error) {
          throw dataJson.message
        } else {
          const idFilm = params.idFilm
          const ikeyComment = params.ikeyComment

          const indexFilmSelected = getters.getIndexFilm(idFilm)

          const filmSelected = state.films[indexFilmSelected]
          const comments = [...filmSelected.comments]
          comments.splice(ikeyComment, 1)

          filmSelected.comments = comments

          commit(SET_ALL_FILMS, state.films)

          return dataJson
        }

      } catch (error) {
        commit(ERROR_COMMETS, error || ERROR_DEFAULT)
      }
    },
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

        const nData = data.map((d) => ({
          ...d,
          comments: [],
        }))

        commit(SET_ALL_FILMS, nData)

      } catch (error) {
        // console.log(error);
        commit(FILMS_ERROR, error || ERROR_DEFAULT)
      }
    },
    async addComment({ commit, state, getters }, params) {


      try {
        const headers = new Headers();
        const data = new FormData();
        data.append("comment", params.comment)
        data.append("id_film", params.id_film)

        if (window.localStorage.getItem("user_sg_token") != null) {
          headers.append("Authorization", `Bearer ${window.localStorage.getItem("user_sg_token")}`);
        }

        const result = await fetch(`${URL_COMMENTS_FILM}`, {
          method: "POST",
          headers: headers,
          body: data
        });
        const dataJson = await result.json();

        if (dataJson.error) {
          throw dataJson.message
        } else {
          const idFilm = params.id_film
          const oldFilms = [...state.films]
          const indexFilmSelected = getters.getIndexFilm(idFilm)
          const filmSelected = state.films[indexFilmSelected]
          const comments = [...filmSelected.comments]
          const newComments = [
            ...comments,
            dataJson.data
          ]

          oldFilms[indexFilmSelected].comments = newComments


          commit(SET_ALL_FILMS, oldFilms)


          return dataJson.message
        }
      } catch (error) {

        commit(ERROR_COMMETS, error || ERROR_DEFAULT)

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
    },
    async getAllCommentFilm({ getters, state, commit }, id) {

      commit(ERROR_COMMETS, "")
      commit(LOADING_COMMETS, true)
      try {
        const indexFilm = getters.getIndexFilm(id);
        let oldFilms = [...state.films]
        oldFilms[indexFilm]

    
        const request = await fetch(`${URL_COMMENTS_FILM}/${id}`, {
          // headers,
          method: "GET"
        });


        const dataJson = await request.json();

        if (dataJson.error) {
          throw dataJson.message
        }

        oldFilms[indexFilm] = {
          ...oldFilms[indexFilm],
          comments: dataJson.data
        }

        commit(SET_ALL_FILMS, oldFilms)
        commit(LOADING_COMMETS, false)

      } catch (error) {

        commit(ERROR_COMMETS, error)
        commit(LOADING_COMMETS, false)

        return false
      }
    }
  },
}

export default store;