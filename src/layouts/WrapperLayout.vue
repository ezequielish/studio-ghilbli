<template>
  <div class="wrapper-layout" :data-theme="aparence">
    <Nuxt />
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  layout: "WrapperLayout",

  computed: {
    ...mapState("appStore", ["aparence"]),
  },
};
</script>
<style lang="scss" scoped>
.wrapper-layout {
  &__form {
    &-user,
    &-auth {
      padding: var(--spacing-md);
      background: var(--background);
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      min-height: calc(100vh - calc(var(--spacing-md) * 2));
      height: 100%;
      @media (max-width: 900px) and (orientation: landscape) {
        padding: calc(14vh + var(--spacing-md-xl)) var(--spacing-md)
          var(--spacing-md) var(--spacing-md);
      }
    }
  }
}
</style>

