
import HomeIcon from "../../assets/icons/home-icon";
// import HeartIcon from "../../assets/icons/heart-icon";
import StarsIcon from "../../assets/icons/stars-icon";
import ProfileIcon from "../../assets/icons/user_profile-icon";
import { SET_NAVBAR, SET_APARENCE } from "../types/appTypes"
const store = {
    namespaced: true,
    state: {
        aparence: "dark",
        navbar: [
            {
                icon: HomeIcon,
                title: "Home",
                url: ["/"],
                active: false,
                order: 1
            },
            // {
            //     icon: HeartIcon,
            //     title: "Favorites",
            //     url: ["/favorites"],
            //     active: false,
            //     order: 2
            // },
            {
                icon: StarsIcon,
                title: "Most popular",
                url: ["/mostpopular"],
                active: false,
                order: 2
            },
            {
                icon: ProfileIcon,
                title: "Profile",
                url: ["/login", "/user"],
                active: false,
                order: 3
            },
        ],
    },

    mutations: {

        SET_NAVBAR(state, payload) {
            state.navbar = payload
        },
        SET_APARENCE(state, payload) {
            state.aparence = payload
        },
    },
    getters: {
        liOrder: () => (items) => {
            return items.sort(function (a, b) {
                return a.order - b.order;
            });
        },
        getLiActive: (state, getters) => (key) => {
            let nbar = [...state.navbar];
            let item = nbar.splice(key, 1)
            nbar.map(i => i.active = false)
            const itemAct = {
                ...item[0],
                active: true
            }
            nbar = [...nbar, itemAct]
            const nbarOrder = getters.liOrder(nbar)
            return nbarOrder;
        },
        getKeyByName: (state) => (path) => {
            return Object.keys(state.navbar).map((nv) => {
                if (state.navbar[nv].url.includes(path)) {
                    return parseInt(nv)
                }
            }).filter(nv => nv != undefined)[0]
        },
    },
    actions: {

        setNavbar({ commit }, navbar) {
            commit(SET_NAVBAR, navbar)
        },
        setAparence({ commit }, mode) {
            commit(SET_APARENCE, mode)
        },
    }


}


export default store;