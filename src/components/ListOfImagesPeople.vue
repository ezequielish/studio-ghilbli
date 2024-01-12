<template>
  <ul :class="peoples.length > 1 ? 'people-col-2' : 'people-col-1'">
    <li v-for="(item, idx) in peoples" :key="idx">
      <img :src="item.url" :alt="item.name" />
      <p>{{ item.name }}</p>
    </li>
  </ul>
</template>
<script>
export default {
  name: "ListOfImagesPeople",
  props: {
    peoples: Array,
  },
  created(){
    console.log(this.peoples);
  }
};
</script>
<style scoped lang="scss">
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: var(--spacing-sm-xl);
  padding: var(--spacing-md);

  li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      border-radius: calc(var(--border-radius-lg) * 2);
      width: 67px;
      height: 67px;
      object-fit: cover;
      aspect-ratio: 1/1;
    }
    p {
      margin: 0;
      text-align: center;
      margin-top: var(--spacing-sm);
      color: var(--purple-3);
    }
  }
}
.people-col-1 {
  grid-template-columns: 1fr;
}
.people-col-2 {
  grid-template-columns: 1fr 1fr;
}
</style>