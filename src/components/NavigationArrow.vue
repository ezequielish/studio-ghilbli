<template>
  <div class="navigation_arrow">
    <button @click="handleClick"><NavArrowLeft :color="color" /></button>
  </div>
</template>


<script>
import NavArrowLeft from "../components/icons/arrow_left-icon.vue";
export default {
  name: "NavigationArrow",
  data: () => ({}),
  props: {
    color: String,
  },
  components: {
    NavArrowLeft,
  },
  computed: {
    // ...mapState("authStore", ["loading", "error"]),
    // ...mapActions("authStore", ["sign"]),
  },
  methods: {
    handleClick() {
      if (this.$route.query.pth != undefined) {

        return this.$router.go(-1);
      }

      return this.$router.push("/");
    },
  },
};
</script>


<style scoped>
</style>