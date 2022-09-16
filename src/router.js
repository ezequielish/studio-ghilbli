
import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("./components/Films.vue")// de esta forma importamos nuestros componentes en lazy loading
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