<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-arrow-badge-left-filled"
    width="44"
    :height="height"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    :stroke="color ? color : '#2c3e50'"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path
      d="M17 6h-6a1 1 0 0 0 -.78 .375l-4 5a1 1 0 0 0 0 1.25l4 5a1 1 0 0 0 .78 .375h6l.112 -.006a1 1 0 0 0 .669 -1.619l-3.501 -4.375l3.5 -4.375a1 1 0 0 0 -.78 -1.625z"
      stroke-width="0"
        :fill="color ? color : '#2c3e50'"
      :stroke="color ? color : '#2c3e50'"
    />
  </svg>
</template>

<script>
export default {
  name: "arrow_left-icon",
  props: {
    height: String,
    color: String,
  },
};
</script>

<style scoped>
</style>
