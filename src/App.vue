<template>
  <div id="app">
    <Header />
    <!-- <img alt="Vue logo" src="./assets/studig.png"> -->

    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}



/* nav a{
  color: blue;
  padding: 8px;
}
nav a.router-link-exact-active{
  color: red;
 
} */
#error{
        text-align: center;
}
</style>
