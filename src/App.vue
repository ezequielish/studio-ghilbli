<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/studig.png"> -->

    <router-view />
    <!-- se imprimen componentes segun la ruta -->
  </div>
</template>

<script>

export default {
  name: "App",

};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Dosis&display=swap");
body {
  margin: 0;
  padding: 0;
  font-family: "Dosis", sans-serif;
  overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0;
  padding: 0;

}

.material-symbols-outlined-fill {
  font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
}

#error {
  text-align: center;
}
</style>
