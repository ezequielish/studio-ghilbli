<template>
  <header>
    <div class="mini-header">
      <ul>
        <li v-if="!routeMinHeader.includes(this.$router.app._route.name)">
          <FromInputs
            :inputs="inputs"
            class="wrapper-inputs"
            :value="inputs['search_movie'].value"
            @keyup="handleSearchMovie"
            @change="handleSearchMovie"
            @blur="handleSearchMovie"
            :loader="false"
            :strongBtn="false"
            ref="_form"
            id="form_search_movie"
            :autocomplete="false"
          />
        </li>
        <li
          v-if="routeMinHeader.includes(this.$router.app._route.name)"
          class="prev-navigation"
        >
          <button @click="handleToBack"><ArrowLeftIcon /></button>
        </li>
        <li class="session">
          <Button
            :strong="true"
            :handleBtn="handleSession"
            :text="
              this.$cookies.get('token_api') != null ||
              this.$cookies.get('token_api') != undefined
                ? 'log out'
                : 'Log in'
            "
          />
        </li>
        <li>
          <button @click="handleAparence">
            <img
              :src="this.aparence == 'light' ? DarkAparence : LightAparence"
              alt="dark mode"
              width="45px"
              height="45px"
            />
          </button>
        </li>
      </ul>
    </div>
    <Navbar />
  </header>
</template>


<script>
import Button from "./Buttons/Button.vue";
import Navbar from "../components/Navbar.vue";
import Logo from "../assets/studig.png";
import DarkAparence from "../assets/calcifer-dark.png";
import LightAparence from "../assets/calcifer-light.png";
import FromInputs from "../components/forms/Inputs.vue";
import ArrowLeftIcon from "./icons/arrow_left-icon.vue";

import { mapActions, mapState } from "vuex";

export default {
  name: "Header",
  components: {
    ArrowLeftIcon,
    Navbar,
    FromInputs,
    Button,
  },
  data: () => ({
    menuHandle: false,
    resultSearch: [],
    showSearch: false,
    routeMinHeader: ["User", "movie-id", "MostPopular"],
    logo: Logo,
    DarkAparence,
    LightAparence,
  }),
  computed: {
    ...mapActions("authStore", ["logoutAuth", "setUsername"]),
    ...mapState("appStore", ["aparence"]),
    ...mapState("filmsStore", ["films", "inputs"]),
    serchMovie() {
      return this.inputs["search_movie"].value;
    },
  },
  methods: {
    handleSearch: function (ev) {
      const value = ev.target.value;
      this.$store.dispatch("filmsStore/changeValueSearch", value);
    },
    handleAparence: function () {
      this.$store.dispatch(
        "appStore/setAparence",
        this.aparence == "light" ? "dark" : "light"
      );
    },
    handleSession: function () {
      if (
        this.$cookies.get("token_api") == null ||
        this.$cookies.get("token_api") == undefined
      ) {
        this.$router.push("/login");
      } else {
        this.$cookies.set("token_api", null);
        this.$store.dispatch("authStore/logoutAuth");
        this.$router.push("/");
      }
    },
    handleSearchMovie: function (ev) {
      const id = ev.target.id;
      const value = ev.target.value;
      if (Object.hasOwn(this.inputs, id)) {
        const payload = {
          key: id,
          value: value,
        };
        this.$store
          .dispatch("filmsStore/setInputSearchMovieValue", payload)
          .then();
      }
    },
    handleToBack: function () {
      this.$router.push("/");
    },
  },
  watch: {
    serchMovie() {
      if (
        this.inputs["search_movie"].value.length > 2 &&
        this.films.length > 0
      ) {
        const movies = this.$store.getters["filmsStore/searchFilms"](
          this.inputs["search_movie"].value
        );
        this.$store.dispatch("filmsStore/setSearchMovieFilter", movies).then();
      }

      if (this.inputs["search_movie"].value.length < 2) {
        this.$store.dispatch("filmsStore/setSearchMovieFilter", []).then();
      }
    },
  },
};
</script>

<style  scoped>
header {
  height: var(--height-header);
  width: 100%;
}
header nav {
  background-color: var(--background-header);
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 2;
}

.prev-navigation {
  cursor: pointer;
  position: absolute;
  left: 0;
}
.prev-navigation button {
  cursor: pointer;
}

.mini-header {
  width: calc(100% - var(--spacing-md));
  height: calc(var(--height-header) - var(--spacing-md));
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-shadow: var(--shadow-elevation-large);
  padding: var(--spacing-sm);
  background-color: var(--background-miniheader);
  z-index: 2;
}

.mini-header .session {
  width: 115px;
}
.mini-header .session button {
  padding: var(--spacing-sm);
  background: var(--purple-5);
  color: var(--purple-9);
}
.mini-header ul {
  display: flex;
  align-items: center;
  gap: var(--spacing-md-xs);
  position: relative;
  width: calc(100% - calc(calc(var(--spacing-sm) * 2)) + var(--spacing-md-xs));
  justify-content: flex-end;
}

.mini-header button {
  background: none;
  border: none;
  outline: none;
}

.mini-header button img {
  background: none;
  border: none;
  width: 45px;
  height: 45px;
}
@media (min-width: 700px) {
  header {
    top: 0;
    left: 0;
    width: 12%;
    height: 100%;
  }
  .mini-header {
    width: 88%;
  }
  nav {
    width: 12%;
  }
}

@media (max-width: 1000px) and (orientation: landscape) {
  header .mini-header {
    height: 11vh;
  }
}
</style>