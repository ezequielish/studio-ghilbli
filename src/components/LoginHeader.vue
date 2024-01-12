<template>
  <div class="wrapper__head-login">
    <NuxtLink to="/"> <img :src="logo" /> </NuxtLink>
    <h1>{{ title }}</h1>
  </div>
</template>


<script>
import Logo from "../assets/studig.png";
export default {
  name: "LoginHeader",
  props: {
    title: String,
  },
  data: () => ({
    logo: Logo,
  }),
};
</script>


<style scoped>
.wrapper__head-login {
  padding: var(--spacing-md);
  color: var(--purple-4);
  font-size: var(--font-md);
  width: 100%;
  box-sizing: border-box;
}
a {
  padding: var(--spacing-lg-xl);
  font-size: var(--font-md);
  display: flex;
  justify-content: center;
}

img {
  width: 155px;
  height: 145px;
  border-radius: 100%;
  filter: drop-shadow(-1px 3px 2px var(--purple-7));
}

h1 {
  font-weight: 600;
}
</style>