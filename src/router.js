
import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/login",
            name: "login",
            component: () => import("./components/Login.vue")
        },
        {
            path: "/user",
            name: "user",
            component: () => import("./components/UserForm.vue")
        },
        {
            path: "/register",
            name: "register",
            component: () => import("./components/UserForm.vue")
        },
        {
            path: "/",
            name: "home",
            component: () => import("./components/Films.vue")
        },
        {
            path: "/favorites",
            name: "favorites",
            component: () => import("./components/Favorites.vue")
        },
        {
            path: "/movie/:id",
            name: "movie",
            component: () => import("./components/Movie.vue")
        },
        {
            path: "*",
            name: "pagenotfound",
            component: () => import("./components/PageNotFound.vue")
        },
    ]

})