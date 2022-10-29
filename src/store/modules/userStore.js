
const URL_USER = process.env.baseUrl + "/user"
import {
    USER_ERROR,
    USER_LOADING,
    USER_DELETE_LOADING
} from "../types/userTypes"
const store = {
    namespaced: true,
    state: {
        userLoading: false,
        userError: "",
        userDelLoading: false
    },
    mutations: {
        USER_ERROR(state, payload) {
            state.userError = payload
            state.userLoading = false
        },
        USER_LOADING(state, payload) {
            state.userLoading = payload
        },
        USER_DELETE_LOADING(state, payload) {
            state.userDelLoading = payload
        }
    },
    actions: {
        async userCreate({ commit }, data) {


            let objFetch = {}
            commit(USER_LOADING, true)
            try {

                if (data.type == "PUT") {
                    const headers = new Headers();

                    if (window.localStorage.getItem("user_sg_token") != null) {
                        headers.append("Authorization", `Bearer ${window.localStorage.getItem("user_sg_token")}`);
                    }

                    objFetch = {
                        headers,
                        method: data.type,
                        body: data.form
                    }
                } else {
                    objFetch = {
                        method: data.type,
                        body: data.form
                    }
                }

                const result = await fetch(`${URL_USER}`, objFetch);
                const dataJson = await result.json();
                if (dataJson.error) {
                    throw dataJson.message
                } else {
                    if (data.type == "PUT") {
                        const name = data.form.get("name")
                        const email = data.form.get("email")

                        window.localStorage.setItem("user_sg", JSON.stringify({ name, email }))
                    }
                    commit(USER_LOADING, false)
                    return dataJson.message
                }
            } catch (error) {
                commit(USER_ERROR, error)
                commit(USER_LOADING, false)

                return false
            }
        },
        async userDel({ commit }) {
            try {
                commit(USER_DELETE_LOADING, true)

                const headers = new Headers();
                if (window.localStorage.getItem("user_sg_token") != null) {
                    headers.append("Authorization", `Bearer ${window.localStorage.getItem("user_sg_token")}`);
                }

                const result = await fetch(`${URL_USER}`, {
                    method: "DELETE",
                    headers
                })
                const dataJson = await result.json();

                if (dataJson.error) {
                    throw dataJson.message
                } else {

                    commit(USER_DELETE_LOADING, false)
                    return dataJson.message
                }

            } catch (error) {

                commit(USER_ERROR, error)
                commit(USER_DELETE_LOADING, false)

            }
        }
    }




}

export default store;