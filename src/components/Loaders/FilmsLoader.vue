
<template>
  <div class="wrapper__films_loader">
    <div class="wrapper__films_loader__image"></div>
    <div class="wrapper__films_loader__info">
      <div class="wrapper__films_loader__info-year"></div>
      <div class="wrapper__films_loader__info-title"></div>
      <div class="wrapper__films_loader__info-time"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilmsLoader",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrapper__films_loader {
  display: grid;
  grid-template-columns: 30% 70%;
  margin-bottom: 15px;
  &__image {
    width: 95px;
    height: 120px;
    border-radius: var(--spacing-sm-xl);
    background: var(--purple-4);
    box-shadow: var(--shadow-elevation-medium);
  }
  &__info {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-bottom: 25px;

    &-year {
      height: 10px;
      width: 35px;
      margin-bottom: var(--spacing-sm-xs);
      border-radius: var(--spacing-sm-xl);
      background: var(--purple-4);
    }
    &-title {
      height: 12px;
      width: 115px;
      margin-bottom: var(--spacing-sm);
      border-radius: var(--spacing-sm-xl);
      background: var(--purple-4);
    }

    &-time {
      height: 10px;
      width: 50px;
      border-radius: var(--spacing-sm-xl);
      background: var(--purple-4);
    }
  }
}
</style>
