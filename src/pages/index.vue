
<template>
  <div class="wrapper-main" :data-theme="aparence">
    <Header />
    <section>
      <div class="container__movies" v-if="!error">
        <div
          v-if="
            !searchMovieFilter.length &&
            this.inputs['search_movie'].value.length < 3
          "
        >
          <h1>Best rank</h1>
          <WrapperSliderVideo
            :items="mostRank"
            class="slider-videos"
            :borderRadius="true"
            :controls="true"
            :showInfo="infoVideo"
          />
        </div>
        <h2>Movies</h2>
        <div
          v-if="typeof this.films === 'object'"
          class="container__movies__card"
        >
          <MovieCard
            :index="index"
            :id="film.id"
            :title="film.title"
            :release_date="film.release_date"
            :image="film.image"
            :score="film.rt_score"
            :running_time="film.running_time"
            :description="film.description"
            :director="film.director"
            :producer="film.producer"
            :date="film.release_date"
            :handleLikeMovie="handleLikeMovie"
            v-for="(film, index) in this.inputs['search_movie'].value.length > 2
              ? this.searchMovieFilter
              : this.films"
            :key="index"
          />
          <!-- 5 image background uploader -->
          <FilmsLoader
            v-for="(n, kl) in 5"
            :key="'ld-' + kl"
            v-show="loading_films"
          />
        </div>
        <div v-else>{{ this.films }}</div>
        <div
          v-if="
            !searchMovieFilter.length &&
            this.inputs['search_movie'].value.length > 2
          "
        >
          <p class="text-empty">Empty data</p>
        </div>
        <div
          v-if="
            typeof this.films === 'object' &&
            !this.films.length &&
            !this.loading_films
          "
        >
          <p class="text-empty">Empty data</p>
        </div>
      </div>
      <div id="error" v-else>
        <h4>{{ error }}</h4>
      </div>
    </section>
  </div>
</template>

<script>
import FilmsLoader from "../components/Loaders/FilmsLoader.vue";
import MovieCard from "../components/MovieCard";
import WrapperSliderVideo from "../components/WrapperSliderVideo";
import Header from "../components/Header.vue";
import { mapState, mapActions } from "vuex";
import { FILMS_ERROR } from "../store/types/fimlsTypes";

export default {
  name: "Films",
  components: {
    MovieCard,
    WrapperSliderVideo,
    Header,
    FilmsLoader,
  },
  data: () => ({
    infoVideo: {
      title: true,
      mediaQuery: {
        sm: { height: "315px" },
        md: { height: "390px" },
        lg: { height: "460px" },
      },
    },
  }),
  methods: {
    ...mapActions("filmsStore", ["getAllFilmsApi"]),
    handleLikeMovie(id) {
      this.likedMovie(`movie-${id}`);
    },
  },
  computed: {
    ...mapState("filmsStore", [
      "films",
      "loading_films",
      "error",
      "mostRank",
      "searchMovieFilter",
      "inputs",
    ]),
    ...mapState("appStore", ["aparence"]),
  },

  async created() {
    if (!this.films.length) {
      await this.getAllFilmsApi();
    }
  },
  destroyed() {
    this.$store.commit(`filmsStore/${FILMS_ERROR}`, "");
    const payload = {
      key: this.inputs["search_movie"].id,
      value: "",
    };
    this.$store.dispatch("filmsStore/setInputSearchMovieValue", payload);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
section {
  padding: var(--spacing-md) var(--spacing-md)
    calc(var(--height-header) + var(--spacing-md-xl)) var(--spacing-md);
  height: 100%;
  background: var(--background);
  min-height: calc(
    100vh - calc(calc(var(--height-header) * 2) + calc(var(--spacing-md) * 2))
  );
}
.container__movies .container__movies__card {
  display: grid;
  grid-template-columns: 100%;
  justify-content: center;
  gap: var(--spacing-md);
}

h1,
h2 {
  /* margin-top: var(--spacing-md-xl); */
  letter-spacing: var(--spacing-letter);
  margin-bottom: var(--spacing-md-xl);
  text-shadow: var(--text-shadow);
  color: var(--purple-4);
  font-size: calc(var(--font-movil) + 0.3rem);
  font-weight: 700;
}

.text-empty {
  text-align: center;
  font-weight: 600;
  padding: var(--spacing-md);
  text-transform: uppercase;
  color: var(--purple-4);
}
.slider-videos {
  position: relative;
  height: 315px;
  border-radius: var(--border-radius-lg-xs);
  margin-bottom: calc(var(--spacing-lg-xs) * 2);
}

@media (min-width: 700px) {
  .wrapper-main {
    display: grid;
    grid-template-columns: 12% 88%;
  }

  section {
    min-height: 80vh;
    padding: calc(var(--height-header) + var(--spacing-md-xl))
      var(--spacing-lg-xs) var(--spacing-lg-xs) var(--spacing-lg-xs);
    grid-column: 2;
  }

  .container__movies .container__movies__card {
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-lg-xl);
  }

  .slider-videos {
    height: 390px;
  }
}

@media (min-width: 1000px) {
  .container__movies .container__movies__card {
    grid-template-columns: 1fr 1fr 1fr;
  }

  .slider-videos {
    height: 460px;
  }

  h1 {
    font-size: var(--font-desktop);
  }
}

@media (max-width: 1000px) and (orientation: landscape) {
  section {
    padding: calc(11vh + var(--spacing-md-xl)) var(--spacing-lg-xs)
      var(--spacing-lg-xs) var(--spacing-lg-xs);
  }
}
</style>
