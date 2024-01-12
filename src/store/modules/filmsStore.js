
import {
  SET_ALL_FILMS,
  FILMS_LOADING,
  LIKE_MOVIE,
  FILMS_ERROR,
  ERROR_COMMETS,
  LOADING_COMMETS,
  SEARCH_FILM,
  SET_FILMS_RANK,
  SET_INPUT_SEARCH_MOVIE,
  SET_SEARCH_MOVIE_FILTER,
} from "../types/fimlsTypes"
import fetchMethods from "../../utils/fetchMethods"


const URL_ALL_MOVIES = "https://ghibliapi.vercel.app/films/";
const URL_COMMENTS_FILM = process.env.baseUrl + "/comment";
const ERROR_DEFAULT = "Something went wrong, please try again later"


const store = {
  namespaced: true,
  state: {
    films: [],
    allFilms: [],
    mostRank: [],
    searchMovieFilter: [],
    search_movie: "",
    inputs: {
      search_movie: {
        id: "search_movie",
        type: "search",
        placeholder: "Search movie",
        required: false,
        value: "",
      },
    },
    loading_search: false,
    loading_films: false,
    error: "",
    error_comments: "",
    loading_comment: false,
  },
  mutations: {
    SET_ALL_FILMS(state, payload) {
      state.films = payload
      state.allFilms = payload
      state.error = ""
      state.loading_films = false

    },
    SET_FILMS_RANK(state, payload) {
      state.mostRank = payload
    },
    FILMS_LOADING(state, payload) {
      state.loading_films = payload
      state.error = false
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
    SET_INPUT_SEARCH_MOVIE(state, payload) {
      state.inputs[payload.key].value = payload.value
    },
    SEARCH_FILM(state, payload) {
      state.films = payload
    },
    SET_SEARCH_MOVIE_FILTER(state, payload) {
      state.searchMovieFilter = payload
    },
  },
  getters: {
    getFilm: state => id => {
      const film = state.films.filter(film => film.id == id)[0]
      return film || []
    },
    getIndexFilm: state => id => {
      let indexFilm = state.films.map((film, i) => film.id == id && i).filter(v => typeof v == "number")
      return (indexFilm.length > 0) ? indexFilm[0] : ""
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

    },
    searchFilms: state => value => {
      const regex = new RegExp(value, "i");
      return state.films.filter(film => film.title.match(regex))
    },
    filterByMostRank: () => (films, maxItems) => {
      if (typeof films === "object" && films.length) {
        return films.sort(function (a, b) {
          return parseInt(b.rt_score) - parseInt(a.rt_score);
        }).filter((film, i) => i <= maxItems);
      }
    }
  },
  actions: {
    // async deleteComment({ commit, getters, state }, params) {

    //   try {

    //     const headers = new Headers();
    //     if (window.localStorage.getItem("user_sg_token") != null) {
    //       headers.append("Authorization", `Bearer ${window.localStorage.getItem("user_sg_token")}`);
    //     }

    //     const result = await fetch(`${URL_COMMENTS_FILM}/${params.idComment}`, {
    //       method: "DELETE",
    //       headers: headers
    //     }).catch(err => {
    //       throw err.message + "delete comments"
    //     });
    //     const dataJson = await result.json();

    //     if (dataJson.error) {
    //       throw dataJson.message
    //     } else {
    //       const idFilm = params.idFilm
    //       const ikeyComment = params.ikeyComment

    //       const indexFilmSelected = getters.getIndexFilm(idFilm)

    //       const filmSelected = state.films[indexFilmSelected]
    //       const comments = [...filmSelected.comments]
    //       comments.splice(ikeyComment, 1)

    //       filmSelected.comments = comments

    //       commit(SET_ALL_FILMS, state.films)

    //       return dataJson
    //     }

    //   } catch (error) {
    //     commit(ERROR_COMMETS, error || ERROR_DEFAULT)
    //   }
    // },
    async getAllFilmsApi({ commit, getters, dispatch }) {
      commit(FILMS_LOADING, true)
      try {
        const result = await fetchMethods().get(URL_ALL_MOVIES)

        // const nData = result.map((d) => ({
        //   ...d,
        //   // director_producer: state.director_producer.filter(dp => dp.id == d.id).shift() || []
        // }))

        const mostRankFilms = result
        const mostRank = getters.filterByMostRank(mostRankFilms, 3)

        commit(SET_ALL_FILMS, mostRankFilms)
        commit(SET_FILMS_RANK, mostRank)
        dispatch("producersDirectorsStore/getProducersDirectorsAll", "", { root: true });
      } catch (error) {
        commit(FILMS_ERROR, error)
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
        }).catch(err => {
          throw err.message
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
    changeValueSearch({ commit, getters, state }, value) {

      const films = getters.searchFilms(value)
      if (value.length <= 1) {
        commit(SEARCH_FILM, state.allFilms)
      } else {
        commit(SEARCH_FILM, films)
      }
    },
    async getAllCommentFilm({ getters, state, commit }, id) {

      commit(ERROR_COMMETS, "")
      commit(LOADING_COMMETS, true)
      try {
        const indexFilm = getters.getIndexFilm(id);
        if (indexFilm === "") { throw "the movie doesn't exist" }
        let oldFilms = [...state.films]
        oldFilms[indexFilm]

        const request = await fetch(`${URL_COMMENTS_FILM}/${id}`, {
          // headers,
          method: "GET"
        }).catch(err => {
          throw err.message + " comments"
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
    },
    setInputSearchMovieValue({ commit }, payload) {
      commit(SET_INPUT_SEARCH_MOVIE, payload)
    },
    setSearchMovieFilter({ commit }, payload) {
      commit(SET_SEARCH_MOVIE_FILTER, payload)
    }
  },
}

export default store;