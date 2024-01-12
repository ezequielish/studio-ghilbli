const routesToLogin = ["/login", "/register"]

export default function redirectRoute({ redirect, app, route }) {
    // app.$cookies.removeAll()
    if (app.$cookies.get("token_api") != undefined && routesToLogin.includes(route.path)) {
        redirect("/user")
    }

    if (app.$cookies.get("token_api") == undefined && route.path == "/user") {
        redirect("/login")
    }
}
