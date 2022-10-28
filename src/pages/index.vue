


<template>
  <div>
    <Header />
    <section>
      <h1>MOVIES</h1>

      <Loader v-show="this.loading_films" />
      <div id="container-movies" v-if="!error">
        <div
          v-for="(film, index) in this.films"
          :key="index"
          class="container-movie"
        >
          <MovieCard
            :index="index"
            :id="film.id"
            :title="film.title"
            :image="film.image"
            :score="film.rt_score"
            :running_time="film.running_time"
            :description="film.description"
            :director="film.director"
            :producer="film.producer"
            :date="film.release_date"
            :handleText="handleText"
            :handleLikeMovie="handleLikeMovie"
          />
        </div>
        <div v-if="!this.films.length && !this.loading_films">
          <p>Empty data</p>
        </div>
      </div>
      <div id="error" v-else>
        <h4>{{ error }}</h4>
      </div>
    </section>
  </div>
</template>

<script>
import Loader from "../components/Loader";
import MovieCard from "../components/MovieCard";
import Header from "../components/Header.vue";
import { mapState, mapActions } from "vuex";
import { FILMS_ERROR } from "../store/types/fimlsTypes";

export default {
  name: "Films",
  components: {
    Loader,
    MovieCard,
    Header,
  },
  // props: {
  //   msg: String
  // }
  data: () => ({}),
  methods: {
    handleText(text) {
      const textLength = text.length;
      if (textLength > 150) {
        const newText = text.slice(0, 150).concat("...");
        return newText;
      }
      return text;
    },

    ...mapActions("filmsStore", ["getAllFilmsApi", "likedMovie"]),
    handleLikeMovie(id) {
      this.likedMovie(`movie-${id}`);
    },
  },
  computed: {
    ...mapState("filmsStore", ["films", "loading_films", "error"]),
  },

  created() {
    console.log({ dd: this.loading_films });
    if (!this.films.length) {
      console.log("IndexFilms");
      this.getAllFilmsApi();
    }
  },
  destroyed() {
    this.$store.commit(`filmsStore/${FILMS_ERROR}`, "");
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
section {
  padding: 15px;
  height: 85vh;
  overflow-y: scroll;
  background: #8e9eab; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #eef2f3,
    #e9e9e9
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #eef2f3,
    #e9e9e9
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

#container-movies {
  display: grid;
  justify-content: center;
  grid-gap: 15px;
  padding: 15px;
}

h1 {
  margin-top: 0;
  font-family: "Bebas Neue", system-ui;
  letter-spacing: 1.1px;
  font-size: 2em;
  color: #2c3e50;
  text-align: center;
}
@media (min-width: 700px) {
  *,
  section {
    grid-template-columns: 1fr 1fr;
  }

  .container-movie {
    display: flex;
    justify-content: center;
  }
}

@media (min-width: 910px) {
  #container-movies {
    padding: 15px 74px 15px 74px;
  }
}
@media (min-width: 1300px) {
  *,
  section {
    grid-template-columns: 1fr 1fr 1fr;
  }
  #container-movies {
    padding: 15px 200px 15px 200px;
  }
}
</style>
