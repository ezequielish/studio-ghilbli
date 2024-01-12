<template>
  <div class="wrapper-main" :data-theme="aparence">
    <Header />
    <section>
      <div class="container__movies" v-if="!error">
        <h1>Most Popular</h1>
        <div v-if="mostRank.length > 0" class="container__movies__card">
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
            :handleLikeMovie="() => {}"
            v-for="(film, index) in mostRank"
            :key="index"
          />
          <!-- 5 image background uploader -->

          <FilmsLoader
            v-for="(n, kl) in 5"
            :key="'ld-' + kl"
            v-show="loading_films"
          />
        </div>

        <div class="text-empty" v-else>EMPTY DATA</div>
      </div>
      <div id="error" v-else>
        <h4>{{ error }}</h4>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Header from "../components/Header.vue";
import MovieCard from "../components/MovieCard";
import FilmsLoader from "../components/Loaders/FilmsLoader.vue";

export default {
  name: "MostPopular",
  components: {
    Header,
    MovieCard,
    FilmsLoader,
  },
  data: () => ({
    mostRank: [],
  }),
  computed: {
    ...mapState("filmsStore", ["films", "loading_films", "error"]),
    ...mapState("appStore", ["aparence"]),
  },
  methods: {
    ...mapActions("filmsStore", ["getAllFilmsApi"]),
    handleMostRank() {
      const movies =
        this.$store.getters["filmsStore/filterByMostRank"](
          this.films,
          this.films.length
        ) || [];

      this.mostRank = movies;
    },
  },
  async created() {
    if (!this.films.length) {
      await this.getAllFilmsApi();
      this.handleMostRank();
    } else {
      this.handleMostRank();
    }
  },
};
</script>


<style scoped lang="scss">
section {
  padding: var(--spacing-md) var(--spacing-md)
    calc(var(--height-header) + var(--spacing-md-xl)) var(--spacing-md);
  height: 100%;
  background: var(--background);
  min-height: calc(
    100vh - calc(calc(var(--height-header) * 2) + calc(var(--spacing-md) * 2))
  );

  .container__movies .container__movies__card {
    display: grid;
    grid-template-columns: 100%;
    justify-content: center;
    gap: var(--spacing-md);
  }

  .text-empty {
    text-align: center;
    font-weight: 600;
    padding: var(--spacing-md);
    text-transform: uppercase;
    color: var(--purple-4);
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
    .container__movies {
      .container__movies__card {
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing-lg-xl);
      }
    }
  }
}

@media (min-width: 1000px) {
  section {
    h1 {
      font-size: var(--font-desktop);
    }
    .container__movies {
      .container__movies__card {
        grid-template-columns: 1fr 1fr 1fr;
      }
    }
  }
}

@media (max-width: 1000px) and (orientation: landscape) {
  section {
    padding: calc(11vh + var(--spacing-md-xl)) var(--spacing-lg-xs)
      var(--spacing-lg-xs) var(--spacing-lg-xs);
  }
}
</style>