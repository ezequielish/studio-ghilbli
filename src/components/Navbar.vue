<template>
  <nav>
    <ul>
      <li
        v-bind:class="{ 'active-li': navb.active }"
        @click="handleNavbarClick(index)"
        v-for="(navb, index) in this.navbar"
        :key="index"
        :data-key="index"
      >
        <NuxtLink :to="navb.url[0]"
          ><span class="nav-title">{{ navb.title }}</span>
          <span v-html="navb.icon"></span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Navbar",
  data: () => ({}),
  methods: {
    handleNavbarClick(key) {
      const itemMenu = this.$store.getters["appStore/getLiActive"](key);
      this.$store.dispatch("appStore/setNavbar", itemMenu);
    },
  },
  computed: {
    ...mapState("appStore", ["navbar"]),
  },
  created() {
    if (this.$route.path) {
      //buscamos el index de la ruta en el array de nav
      const itemMenuKey = this.$store.getters["appStore/getKeyByName"](
        this.$route.path
      );
      //Activamos el item en el nav
      const itemMenu = this.$store.getters["appStore/getLiActive"](itemMenuKey);
      this.$store.dispatch("appStore/setNavbar", itemMenu);
    }
  },
};
</script>

<style scoped lang="scss">
nav {
  height: inherit;
  width: 100%;
  border-top: 1px solid var(--purple-5);
  @media (min-width: 700px) {
    display: flex;
    align-items: center;
  }
  ul {
    width: 100%;
    height: inherit;
    display: flex;
    margin: 0;
    padding: 0;
    display: grid;
    grid-auto-flow: column;

    @media (min-width: 700px) {
      grid-template-columns: 1fr;
      height: auto;
      gap: var(--spacing-lg-xl);
      padding: var(--spacing-md);
      width: calc(100% - calc(var(--spacing-md) * 2));
      text-align: center;
      grid-auto-flow: row;
    }
    li,
    span,
    a {
      list-style: none;
      display: flex;
      justify-content: center;
      align-items: center;
      height: inherit;
      cursor: pointer;
      text-decoration: none;
      color: var(--purple-5);

      @media (min-width: 700px) {
        display: flex;
        flex-direction: column-reverse;
      }
    }

    .nav-title {
      display: none;
    }

    .active-li {
      &::after {
        content: "";
        position: absolute;
        width: 40px;
        height: 40px;
        z-index: -1;
        border-radius: var(--spacing-sm-xs);
      }
      -webkit-filter: drop-shadow(7px 2px 6px var(--active-nav));
      -moz-filter: drop-shadow(7px 2px 6px var(--active-nav));
      -o-filter: drop-shadow(7px 2px 6px var(--active-nav));
      -ms-filter: drop-shadow(7px 2px 6px var(--active-nav));
      filter: drop-shadow(7px 2px 6px var(--active-nav));
    }
  }
}

@media (min-width: 700px) {
  nav {
    border-right: 1px solid var(--purple-5);
    width: 12%;
  }
  .nav-title {
    display: flex !important;
  }
}
</style>