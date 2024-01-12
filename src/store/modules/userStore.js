
const URL_USER_CREATE = process.env.baseUrl + "/user"
const URL_USER_UPDATE = process.env.baseUrl + "/user/update"
const URL_USER_DELETE = process.env.baseUrl + "/user"
import {
    USER_MESSAGES_ERROR,
    USER_MESSAGES_SUCCESS,
    RESET_USER_ALERT,
    USER_LOADING,
    SET_INPUT,
    SET_INPUT_REQUIRED,
    // USER_DELETE_LOADING
} from "../types/userTypes"
import fetchMethods from "../../utils/fetchMethods"

const store = {
    namespaced: true,
    state: {
        inputs: {
            name: {
                id: "name",
                type: "text",
                placeholder: "Enter your name",
                required: true,
                label: "Name",
                value: "",
            },
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
            },
            repeat_password: {
                id: "repeat_password",
                type: "password",
                placeholder: "*******",
                required: true,
                label: "Repeat Password",
                value: "",
            },
        },
        userLoading: false,
        userAlerts: {
            title: "",
            type: "",
            message: ""
        },
        userDelLoading: false
    },
    mutations: {
        USER_MESSAGES_ERROR(state, payload) {
            state.userAlerts = {
                type: "warning",
                title: "Warning",
                message: payload
            }
            state.userLoading = false
        },
        SET_INPUT(state, payload) {
            state.inputs[payload.key].value = payload.value
        },
        SET_INPUT_REQUIRED(state, payload) {
            state.inputs[payload.key].required = payload.value
        },
        USER_MESSAGES_SUCCESS(state, payload) {
            state.userAlerts = {
                type: "success",
                title: payload.title,
                message: payload.message
            }
            state.userLoading = false
        },
        RESET_USER_ALERT(state) {
            state.userAlerts = {
                type: "",
                title: "",
                message: ""
            }
            state.userLoading = false
        },
        USER_LOADING(state, payload) {
            state.userLoading = payload
            state.userError = false
            state.userAlerts = {
                type: "",
                title: "",
                message: ""
            }
        },
        USER_DELETE_LOADING(state, payload) {
            state.userDelLoading = payload
        },
    },
    getters: {
        structureBodyFormUser: () => inputs => {
            const { name, email, password, repeat_password } = inputs
            const form = new FormData();
            form.append("name", name.value);
            form.append("email", email.value);
            form.append("pwss", password.value);
            if (password.value !== repeat_password.value) {
                return "Passwords do not match"
            }

            return form
        },
    },
    actions: {
        async userCreate({ commit, getters, state }, url) {
            commit(USER_LOADING, true)

            const formValues = state.inputs
            const inputs = getters.structureBodyFormUser(formValues)
            const headers = new Headers();
            let method = "POST"
            let _url = URL_USER_CREATE
            if (url == "update") {
                _url = URL_USER_UPDATE
                method = "PUT"
                if (window.localStorage.getItem("user_sg_token") != null) {
                    headers.append("Authorization", `Bearer ${JSON.parse(window.localStorage.getItem("user_sg_token"))}`);
                }
            }
            try {
                if (typeof inputs != "object") {
                    throw inputs || "invalid formats"
                }
                const fetchConfig = {
                    method,
                    body: inputs,
                    headers
                }

                let result = await fetchMethods().send(_url, fetchConfig)
                const payload = {
                    title: "Success",
                    message: Object.hasOwn(result, "message") ? result.message : ""
                }
                commit(USER_MESSAGES_SUCCESS, payload)
            } catch (error) {
                commit(USER_MESSAGES_ERROR, error)
            }
        },
        resetUserAlerts({ commit }) {
            commit(RESET_USER_ALERT, "")
        },
        setInputValue({ commit }, input) {
            input.forEach(element => {
                commit(SET_INPUT, element)
            });
        },
        setInputRequired({ commit }, input) {
            input.forEach(element => {
                commit(SET_INPUT_REQUIRED, element)
            });
        },
        resetInputValues({ commit, state }) {

            Object.keys(state.inputs).forEach(key => {
                commit(SET_INPUT, { key, value: "" })
            })
        },
        resetAlert({ commit }) {
            commit(RESET_USER_ALERT)
        },
        async userDelete({ commit }) {


            commit(USER_LOADING, true)
            const headers = new Headers();
            let _url = URL_USER_DELETE
            if (window.localStorage.getItem("user_sg_token") != null) {
                headers.append("Authorization", `Bearer ${JSON.parse(window.localStorage.getItem("user_sg_token"))}`);
            }
            try {
                const fetchConfig = {
                    method: "DELETE",
                    headers
                }

                let result = await fetchMethods().send(_url, fetchConfig)
                const payload = {
                    title: "Success Delete",
                    message: Object.hasOwn(result, "message") ? result.message : ""
                }
                commit(USER_MESSAGES_SUCCESS, payload)
            } catch (error) {
                commit(USER_MESSAGES_ERROR, error)
            }
        }
    }




}

export default store;