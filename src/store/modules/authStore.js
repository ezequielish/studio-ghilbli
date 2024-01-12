
import {
    LOADING_AUTH,
    ERROR_LOGIN,
    LOGOUT_AUTH,
    SET_SCOPE,
    SET_EMAIL,
    SET_TOKEN,
    SET_NAME,
    SET_INPUT,
} from "../types/authTypes"
const url = process.env.baseUrl + "/login"
import fetchMethods from "../../utils/fetchMethods"

const store = {
    namespaced: true,
    state: {
        scope: [],
        email: "",
        name: "",
        apiToken: null,
        loading: false,
        error: "",
        inputs: {
            email: {
                id: "email",
                type: "email",
                placeholder: "Enter your email",
                required: true,
                label: "Email",
                value: "",
            },
            password: {
                id: "password",
                type: "password",
                placeholder: "*******",
                required: true,
                label: "Password",
                value: "",
                showPassword: true
            },
        },
    },
    mutations: {

        LOADING_AUTH(state, payload) {
            state.loading = payload
        },

        ERROR_LOGIN(state, payload) {
            state.error = payload
            state.loading = false
        },
        LOGOUT_AUTH(state) {
            if (process.browser) {
                localStorage.removeItem("email_sg")
                localStorage.removeItem("user_sg_scope")
                localStorage.removeItem("user_sg_token")
                localStorage.removeItem("user_sg_name")
            }
            state.username = ""
            state.email = ""
            state.apiToken = null
            state.scope = []
        },
        SET_EMAIL(state, payload) {
            state.email = payload
        },
        SET_TOKEN(state, payload) {
            state.apiToken = payload
        },
        SET_SCOPE(state, payload) {
            state.scope = payload
        },
        SET_NAME(state, payload) {
            state.name = payload
        },
        SET_INPUT(state, payload) {
            state.inputs[payload.key].value = payload.value
        },
    },
    getters: {
        getError: state => () => {
            return state.error
        },
        getUsername: state => () => {
            return state.username
        },
        structureBodyFormAuth: () => inputs => {
            const { email, password } = inputs
            const auth = Buffer.from(email.value + ":" + password.value).toString("base64")
            return auth
        }
    },
    actions: {

        logoutAuth({ commit }) {
            commit(LOGOUT_AUTH)
        },
        async sign({ commit, getters, state }) {

            commit(LOADING_AUTH, true)
            try {
                const formValues = state.inputs
                const auth = getters.structureBodyFormAuth(formValues)
                let headers = new Headers();
                headers.append("Authorization", `Basic ${auth}`);
                const fetchConfig = {
                    method: "POST",
                    headers
                }

                let result = await fetchMethods().send(url, fetchConfig)

                if (process.browser) {
                    localStorage.setItem("email_sg", JSON.stringify(result.user.email))
                    localStorage.setItem("user_sg_scope", JSON.stringify(result.scope))
                    if (result.token != "") { localStorage.setItem("user_sg_token", JSON.stringify(result.token)) }

                    localStorage.setItem("user_sg_name", JSON.stringify(result.user.name))
                }

                commit(ERROR_LOGIN, "")
                if (result.token != "") { commit(SET_TOKEN, result.token) }
                commit(SET_SCOPE, result.scope)
                commit(SET_EMAIL, result.user.email)
                commit(SET_NAME, result.user.name)

                return true
            } catch (error) {
                commit(ERROR_LOGIN, error)
            }

        },
        setUserData({ commit }) {
            const name = JSON.parse(localStorage.getItem("user_sg_name")) || ""
            const email = JSON.parse(localStorage.getItem("email_sg")) || ""
            commit(SET_NAME, name)
            commit(SET_EMAIL, email)
        },
        setInputValue({ commit }, input) {
            input.forEach(element => {
                commit(SET_INPUT, element)
            });
        },
        resetInputValues({ commit, state }) {
            Object.keys(state.inputs).forEach(key => {
                commit(SET_INPUT, { key, value: "" })
            })
        },
    }
}


export default store;