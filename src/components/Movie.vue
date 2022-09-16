 <template>
  <section>
    <div class="loader-container">
      <Loader v-show="this.loading_films" />
    </div>
    <div id="card" v-if="!error">
      <div
        id="banner-img"
        :style="backgroundCard(filmSelected.movie_banner)"
      ></div>
      <div id="movie-info-container">
        <div id="img" :style="backgroundCard(filmSelected.image)"></div>

        <div id="movie-info">
          <h1>{{ filmSelected.title }}</h1>
          <h2>{{ filmSelected.original_title }}</h2>
          <div id="movie-info-star-score">
            <StarScore
              :score="parseInt(filmSelected.rt_score)"
              v-if="parseInt(filmSelected.rt_score) > 0"
            />
            <div class="movie-info-time">
              <span class="material-symbols-outlined timer-icon"> alarm </span>
              <span>{{ hour }}h {{ minutes }}m</span>
            </div>
          </div>
          <div class="movie-info-date">
            <p>{{ filmSelected.release_date }}</p>
          </div>
        </div>
      </div>
      <div class="movie-info-dp">
        <p><span>Director:</span> {{ filmSelected.director }}</p>
        <p><span>Producer:</span> {{ filmSelected.producer }}</p>
      </div>
      <div id="nav-container">
        <ul class="nav">
          <li class="li-active">Info</li>
          <li>Comments</li>
        </ul>

        <div>
          <div id="info">
            <b>Storyline</b>
            <p>
              {{ filmSelected.description }}
            </p>
          </div>
          <div id=""></div>
        </div>
      </div>
    </div>
    <div id="error" v-else>
      <h4>{{ error }}</h4>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import Loader from "./Loader";
import { FILMS_ERROR } from "../store/types/fimlsTypes";
import StarScore from "./StarScore.vue";

export default {
  name: "Movie",
  components: {
    Loader,
    StarScore,
  },
  data: () => ({
    hour: 0,
    minutes: 0,
    filmSelected: {},
  }),
  created() {
    if (!this.films.length) {
      this.$store.dispatch("filmsStore/getAllFilmsApi").then(() => {
        const film = this.$store.getters["filmsStore/getFilm"](
          this.$route.params.id
        );
        this.filmSelected = film;
        this.setHourMin(film, this);
      });
    } else {
      const film = this.$store.getters["filmsStore/getFilm"](
        this.$route.params.id
      );
      this.filmSelected = film;

      this.setHourMin(film, this);
    }
  },
  computed: {
    ...mapState("filmsStore", ["films", "loading_films", "error"]),

    backgroundCard: () => {
      return (img) => {
        return {
          "background-image": `url(${img})`,
        };
      };
    },
  },
  destroyed() {
    this.$store.commit(`filmsStore/${FILMS_ERROR}`, "");
  },
  watch: {
    "$route.params.id": function () {
      if (this.$router.app._route.name == "movie") {
        this.$store.getters["filmsStore/getFilm"](this.$route.params.id);
      }
    },
  },
  methods: {
    pad: (number) => {
      if (number < 10) {
        return "0" + number;
      }
      return number;
    },
    setHourMin: (film, _this) => {
      if (Object.prototype.hasOwnProperty.call(_this, "pad")) {
        const min = film.running_time;
        const hour = Math.floor(min / 60);
        const minutes = _this.pad(min % 60);
        _this.hour = hour;
        _this.minutes = minutes;
      }
    },
  },
};
</script>

<style scoped>
section {
  height: 100vh;
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
#card {
  position: relative;
}
.loader-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  position: absolute;
}

#banner-img {
  height: 265px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: #d5d5d5;
}

#img {
  background-color: #d5d5d5;
  width: 153px;
  height: 197px;
  background-size: 100% 100%;
  border-radius: 8px;
  box-shadow: 4px 37px 70px -58px rgba(0, 0, 0, 0.65) !important;
  -webkit-box-shadow: 4px 37px 70px -58px rgba(0, 0, 0, 0.65) !important;
  -moz-box-shadow: 4px 37px 70px -58px rgba(0, 0, 0, 0.65) !important;
  margin-top: -205px;
  margin-left: 14px;
  border: solid grey 1px;
}
h1,
h2 {
  margin: 0;
  text-align: left;
  margin-bottom: 6px;
  font-weight: 500;
  font-size: 1.7em;
}

#movie-info-container {
  display: flex;
  flex-direction: column;
}
#movie-info {
  font-family: "Dosis", sans-serif;
  width: 210px;
  margin-top: 14px;
  margin-left: 14px;
  font-size: 0.8em;
}

#movie-info-star-score {
  display: flex;
}
.movie-info-time {
  display: flex;
  align-items: center;
  padding-top: 2px;
  margin-left: 14px;
}
.movie-info-time .timer-icon {
  font-size: 1.4em;
}
.movie-info-date {
  display: flex;
}
.movie-info-date p {
  text-align: left;
  border: solid grey 1px;
  margin-left: 2px;
  margin-top: 6px;
  padding: 2px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #3c3c3c;
}
.movie-info-dp {
  display: flex;
  margin-left: 14px;
  flex-direction: column;
  align-items: flex-start;
  font-family: "Dosis", sans-serif;
}

.movie-info-dp p {
  margin-top: 8px;
  margin-bottom: 8px;
}

.movie-info-dp span {
  font-weight: bold;
}
.nav {
  display: flex;
  list-style: none;
  justify-content: center;
  padding-left: 26px;
  font-family: "Dosis", sans-serif;
  font-size: 1.2em;
  margin-bottom: 0px;
}
.nav li {
  padding: 7px;
}

.li-active {
  border-bottom: solid grey 2px;
}

#info {
  display: flex;
  text-align: justify;
  font-size: 0.9em;
  padding: 14px;
  color: #3c3c3c;
  flex-direction: column;
}
#info p {
  margin: 0;
  line-height: 18px;
}
#info b {
  font-size: 1.2em;
  margin-bottom: 7px;
}

@media (min-width: 390px) {
  #movie-info-container {
    display: flex;
    flex-direction: row;
  }
  #img {
    margin-top: -52px;
    border: none;
  }
  .movie-info-dp {
    margin-top: 14px;
  }
}
@media (min-width: 720px) {
  #banner-img {
    height: 350px;
    width: 55%;
    border-radius: 0px 0px 7px 0px;
  }
  #nav-container {
    width: 45%;
    position: absolute;
    right: 0;
    top: 0;
  }
  .loader-container {
    width: 55%;
  }
}
</style>