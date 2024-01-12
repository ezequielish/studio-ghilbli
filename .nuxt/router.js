import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5697f0de = () => interopDefault(import('../src/pages/Favorites.vue' /* webpackChunkName: "pages/Favorites" */))
const _1494ac70 = () => interopDefault(import('../src/pages/Login.vue' /* webpackChunkName: "pages/Login" */))
const _3f2c751d = () => interopDefault(import('../src/pages/MostPopular.vue' /* webpackChunkName: "pages/MostPopular" */))
const _80c05328 = () => interopDefault(import('../src/pages/Register.vue' /* webpackChunkName: "pages/Register" */))
const _de267fd8 = () => interopDefault(import('../src/pages/User.vue' /* webpackChunkName: "pages/User" */))
const _05a8a9fc = () => interopDefault(import('../src/pages/movie/_id.vue' /* webpackChunkName: "pages/movie/_id" */))
const _590a2d0e = () => interopDefault(import('../src/pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/Favorites",
    component: _5697f0de,
    name: "Favorites"
  }, {
    path: "/Login",
    component: _1494ac70,
    name: "Login"
  }, {
    path: "/MostPopular",
    component: _3f2c751d,
    name: "MostPopular"
  }, {
    path: "/Register",
    component: _80c05328,
    name: "Register"
  }, {
    path: "/User",
    component: _de267fd8,
    name: "User"
  }, {
    path: "/movie/:id?",
    component: _05a8a9fc,
    name: "movie-id"
  }, {
    path: "/",
    component: _590a2d0e,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
