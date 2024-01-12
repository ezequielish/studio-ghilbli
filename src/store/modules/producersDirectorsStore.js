
import {
    PRODUCERS_DIRECTORS_LOADING,
    // PRODUCERS_DIRECTORS__MESSAGES_SUCCESS,
    PRODUCERS_DIRECTORS_MESSAGES_ERROR,
    SET_ALL_PRODUCERS_DIRECTORS
} from "../types/producersDirectorsTypes"
import fetchMethods from "../../utils/fetchMethods"

const URL_PRODUCERS_DIRECTORS = process.env.baseUrl + "/producers_directors";


const store = {
    namespaced: true,
    state: {
        director_producer: [],
        loadingDirectorsProducers: false,
        directorsProducersAlerts: {
            title: "",
            type: "",
            message: ""
        },
    },
    mutations: {

        PRODUCERS_DIRECTORS_LOADING(state, payload) {
            state.loadingDirectorsProducers = payload
            state.directorsProducersAlerts = {
                type: "",
                title: "",
                message: ""
            }
        },
        SET_ALL_PRODUCERS_DIRECTORS(state, payload) {
            state.director_producer = payload
        },
        PRODUCERS_DIRECTORS_MESSAGES_ERROR(state, payload) {
            state.directorsProducersAlerts = {
                type: "warning",
                title: "Warning",
                message: payload
            }
            state.loadingDirectorsProducers = false
        }
    },
    getters: {
        getPersonByIdMovie: state => id => {
            const movie = state.director_producer.find(dp => dp.id_movie == id)
            return movie || []
        },
    },
    actions: {
        async getProducersDirectorsAll({ commit }) {
            try {
                commit(PRODUCERS_DIRECTORS_LOADING, true)
                const result = await fetchMethods().get(URL_PRODUCERS_DIRECTORS)
                commit(SET_ALL_PRODUCERS_DIRECTORS, result?.data || [])
                commit(PRODUCERS_DIRECTORS_LOADING, false)
            } catch (error) {
                commit(PRODUCERS_DIRECTORS_MESSAGES_ERROR, error)
            }

        }
    },
}

export default store;