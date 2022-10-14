
import { LOADING_AUTH, ERROR_LOGIN, LOGOUT_AUTH, SET_USERNAME } from "../types/authTypes"

const url = process.env.VUE_APP_URL_PROD + "/login"

const store = {
    namespaced: true,
    state: {
        scope: [],
        username: "",
        apiToken: null,
        loading: false,
        error: ""
    },

    mutations: {

        LOADING_AUTH(state, payload) {
            state.loading = payload
        },

        ERROR_LOGIN(state, payload) {
            state.error = payload
        },
        LOGOUT_AUTH() {
            window.localStorage.removeItem("user_sg")
            window.localStorage.removeItem("user_sg_scope")
            window.localStorage.removeItem("user_sg_token")
        },
        SET_USERNAME(state) {
            if (window.localStorage.getItem("user_sg") != null) {
                const user = JSON.parse(window.localStorage.getItem("user_sg"));
                state.username = user.name ?? "";
            } else {
                state.username = "";
            }
        }

    },
    getters: {
        getError: state => () => {
            return state.error
        },
        getUsername: state => () => {
            return state.username
        },
    },
    actions: {

        setUsername({ commit }) {
            commit(SET_USERNAME)
        },
        logoutAuth({ commit }) {
            commit(LOGOUT_AUTH)
        },
        async sign({ commit }, user) {

            commit(LOADING_AUTH, true)
            commit(ERROR_LOGIN, "")

            try {

                let headers = new Headers();
                const auth = Buffer.from(user.user + ":" + user.pass).toString("base64")

                headers.append("Authorization", `Basic ${auth}`);

                console.log({
                    dd:process.env,
                    url
                });

                let request = await fetch(url, {
                    headers,
                    method: "POST"
                });

                const dataJson = await request.json();

                if (dataJson.error) {
                    throw dataJson.message
                }


                window.localStorage.setItem("user_sg", JSON.stringify(dataJson.data.user))
                window.localStorage.setItem("user_sg_scope", JSON.stringify(dataJson.data.scope))
                window.localStorage.setItem("user_sg_token", dataJson.data.token)
                commit(LOADING_AUTH, false)

                return true

            } catch (error) {
                commit(ERROR_LOGIN, error)
                commit(LOADING_AUTH, false)

                return false
            }

        }
    }


}


export default store;