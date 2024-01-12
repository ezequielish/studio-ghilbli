<template>
  <div>
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <!-- <h2>{{error}}</h2> -->
    <img :src="NotFoundImg" alt="not found" width="450px" height="400px" />
    <NuxtLink to="/">Home page</NuxtLink>
  </div>
</template>

<script>
import NotFoundImg from "../static/not_found.png";
export default {
  props: ["error"],
  layout: "error", // you can set a custom layout for the error page
  data: () => ({
    NotFoundImg,
  }),
};
</script>


<style scoped>
div {
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;
  margin-top: 3rem;
  font-weight: bold;
  color: #4e4e4e;
}
h1 {
  font-size: 3rem;
}

a{
  color: var(--purple-9);
  text-decoration: none;
  font-size: 2rem;
  font-weight: bold;
}
</style>