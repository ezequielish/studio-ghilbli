<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-clock-hour-2"
    width="44"
    height="44"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    :stroke="color"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M12 12l3 -2" />
    <path d="M12 7v5" />
  </svg>
</template>

<script>
export default {
  name: "clock-icon",
  props: {
    height: String,
    color: String,
  },
};
</script>

<style scoped>
</style>