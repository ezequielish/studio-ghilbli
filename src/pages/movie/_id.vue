<template>
  <div class="wrapper-main" :data-theme="aparence">
    <Header />
    <section>
      <div class="loader" v-show="this.loading_films">
        <Loader />
      </div>
      <div class="wrapper" v-if="!error">
        <WrapperSliderVideo
          :items="[filmSelected]"
          class="wrapper__slider-videos"
          :showInfo="infoVideo"
        />
        <div class="wrapper__movie" v-show="Object.keys(filmSelected).length">
          <h2>{{ filmSelected.original_title }}</h2>
          <div class="wrapper__movie__info">
            <div id="wrapper__movie__info-star-score">
              <ClockIcon
                :color="icons.color"
                :width="icons.width"
                :height="icons.height"
              />
              <span> {{ hour }}h {{ minutes }}m </span>
            </div>
            <div class="wrapper__movie__info-date">
              <CalendarIcon
                :color="icons.color"
                :width="icons.width"
                :height="icons.height"
              /><span>{{ filmSelected.release_date }}</span>
            </div>
          </div>
          <div class="wrapper__movie__info-description">
            <h3>Storyline</h3>
            <p>
              {{ filmDescription.text }}
              <span
                v-if="
                  Object.keys(filmSelected).length > 0 &&
                  filmSelected.description.split('.').filter((i) => i != '')
                    .length > 1
                "
              >
                <button v-if="!filmDescription.active" @click="handleShowMore">
                  show more
                </button>
                <button @click="handleShowLess" v-else>show less</button>
              </span>
            </p>
          </div>
          <div
            class="wrapper__movie__info__people"
            v-if="Object.keys(filmSelected).length"
          >
            <div class="wrapper__movie__info__people-director">
              <h4>Directors</h4>
              <ListOfImagesPeople
                :peoples="director_producer_exist('director')"
                :loading="this.loadingDirectorsProducers"
              />
            </div>
            <div class="wrapper__movie__info__people-producer">
              <h4>Producers</h4>
              <ListOfImagesPeople
                :peoples="director_producer_exist('producer')"
                :loading="this.loadingDirectorsProducers"
              />
            </div>
          </div>
        </div>
      </div>
      <div id="wrapper__error" v-else>
        <h4>{{ error }}</h4>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Loader from "../../components/Loader";
import Header from "../../components/Header.vue";
import { FILMS_ERROR } from "../../store/types/fimlsTypes";
import WrapperSliderVideo from "../../components/WrapperSliderVideo";
import ListOfImagesPeople from "../../components/ListOfImagesPeople.vue";
// import swal from "sweetalert";
import CalendarIcon from "../../components/icons/calendar-icon.vue";
import ClockIcon from "../../components/icons/clock-icon.vue";

export default {
  name: "Movie",
  components: {
    Header,
    Loader,
    CalendarIcon,
    ClockIcon,
    WrapperSliderVideo,
    ListOfImagesPeople,
  },
  head() {
    return {
      title: this.filmSelected.title,
      meta: [
        {
          name: "description",
          content: this.filmSelected.description,
        },
      ],
    };
  },
  data: () => ({
    hour: 0,
    minutes: 0,
    filmSelected: {},
    filmDescription: {
      text: "",
      active: false,
    },
    commentValue: "",
    loading_newcomment: false,
    commentValueLength: 180,
    infoVideo: {
      title: true,
      scoreStar: true,
      mediaQuery: {
        sm: { height: "420px" },
        md: { height: "420px" },
        lg: { height: "420px" },
      },
    },
    icons: {
      color: "#272343",
      width: "30px",
      height: "25px",
    },
  }),
  async created() {
    this.icons.color = this.aparence == "light" ? "#272343" : "#f1f3fc";
    if (!this.films.length) {
      this.$store.dispatch("filmsStore/getAllFilmsApi").then(async () => {
        await this.getDataById(this.$route.params.id);
        // await this.$store
        //   .dispatch("filmsStore/getAllCommentFilm", this.$route.params.id)
        //   .then();
      });
    } else {
      await this.getDataById(this.$route.params.id);
      // await this.$store
      //   .dispatch("filmsStore/getAllCommentFilm", this.$route.params.id)
      //   .then();
    }
  },
  computed: {
    ...mapState("filmsStore", [
      "films",
      "loading_films",
      "error",
      "error_comments",
      "loading_comment",
    ]),
    ...mapState("authStore", ["username"]),
    ...mapState("appStore", ["aparence"]),
    ...mapState("producersDirectorsStore", [
      "director_producer",
      "loadingDirectorsProducers",
    ]),

    handleShortText: function () {
      return (text) => {
        if (text != undefined) {
          let shortText = text.split(".").filter((i) => i != "");
          if (shortText.length > 1) {
            let textLength = Math.floor(shortText.length / 2);
            shortText = shortText.splice(0, textLength);
            return shortText.length > 0 ? shortText[0] + "..." : "";
          }
          return text;
        }
      };
    },
    director_producer_exist: function () {
      return (type) => {
        const result = this.$store.getters[
          "producersDirectorsStore/getPersonByIdMovie"
        ](this.filmSelected.id);
        return Object.hasOwn(result, `${type}`) ? result[`${type}`] : "";
      };
    },
  },
  destroyed() {
    this.$store.commit(`filmsStore/${FILMS_ERROR}`, "");
  },
  watch: {
    aparence() {
      this.icons.color = this.aparence == "light" ? "#272343" : "#f1f3fc";
    },
    "$route.params.id": function () {
      if (this.$router.app._route.name == "movie") {
        this.$store.getters["filmsStore/getFilm"](this.$route.params.id);
      }
    },
    // error_comments() {
    //   if (this.error_comments != "") {
    //     swal({
    //       title: "Error!",
    //       text: this.error_comments,
    //       icon: "warning",
    //       button: "Close!",
    //     }).then(() => {
    //       this.$store.commit(`filmsStore/${ERROR_COMMETS}`, "");
    //     });
    //   }
    // },
  },

  methods: {
    getDataById: async function (id) {
      const film = await this.$store.getters["filmsStore/getFilm"](id);
      if (film) {
        this.filmSelected = film;
        this.filmDescription.text = this.handleShortText(film.description);
        this.setHourMin(film, this);
      }
    },
    handleShowMore: function () {
      this.filmDescription.text = this.filmSelected.description;
      this.filmDescription.active = true;
    },
    handleShowLess: function () {
      this.filmDescription.text = this.handleShortText(
        this.filmSelected.description
      );
      this.filmDescription.active = false;
    },
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
    // handleNewComment: async function () {
    //   if (this.commentValue != "") {
    //     this.loading_newcomment = true;
    //     try {
    //       this.$store
    //         .dispatch("filmsStore/addComment", {
    //           comment: this.commentValue,
    //           id_film: this.$route.params.id,
    //         })
    //         .then((message) => {
    //           this.commentValue = "";
    //           this.commentValueLength = 180;
    //           this.loading_newcomment = false;
    //           if (message != "" && message != undefined) {
    //             swal({
    //               title: "Success!",
    //               text: message,
    //               icon: "success",
    //               button: "Close!",
    //             });
    //           }
    //         });
    //     } catch (error) {
    //       this.loading_newcomment = false;
    //     }
    //   }
    // },
    // handleChangeInput(ev) {
    //   this.commentValue = ev.target.value;
    //   this.commentValueLength = 180 - this.commentValue.length;
    // },
    // handleNav: (ev) => {
    //   const nav = document.querySelector(".nav");
    //   const container = document.querySelector("#container");
    //   const element = ev.target;
    //   const id = parseInt(element.dataset.id);

    //   nav.children.forEach((element) => {
    //     element.classList.remove("li-active");
    //   });
    //   container.children.forEach((element) => {
    //     element.style.display = "none";
    //   });
    //   element.classList.add("li-active");
    //   container.children[id - 1].style.display = "flex";
    // },
  },
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0");

section {
  background: var(--background);
  min-height: calc(100vh - var(--height-header));

  @media (min-width: 700px) {
    margin-top: var(--height-header);
    justify-items: center;
    display: grid;
    grid-template-columns: 12% 88%;
  }
  .loader {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
  }

  .wrapper {
    @media (min-width: 700px) {
      grid-column: 2;
      // margin-left: 12%;
      max-width: 700px;
    }
    &__arrow {
      position: absolute;
      left: 25px;
      z-index: 99;
      svg {
        stroke: var(--color-light-3);
      }
    }

    &__slider-videos {
      position: relative;
      height: 420px;

      @media (min-width: 300px) and (max-width: 767px) and (orientation: landscape) {
        height: 100vh;
      }
    }

    &__movie {
      display: grid;
      padding: var(--spacing-md-xl) var(--spacing-md-xl) var(--height-header)
        var(--spacing-md-xl);
      align-items: center;
      justify-items: center;
      grid-gap: var(--spacing-md-xl);

      @media (min-width: 700px) {
        padding: var(--spacing-md-xl);
      }
      h2 {
        margin: 0;
        font-size: calc(var(--font-movil) - 0.5rem);
        color: var(--purple-2);
      }

      &__info {
        display: flex;
        background: var(--purple-9);
        height: calc(var(--spacing-md-xl) * 2);
        align-items: center;
        border-radius: var(--border-radius-lg-xs);
        justify-content: space-around;
        padding: var(--spacing-sm-xl);
        width: 230px;

        &-date {
          display: flex;
        }

        div:first-child {
          display: flex;
          span {
            font-size: calc(var(--font-movil) - 0.7rem);
            letter-spacing: var(--spacing-letter-md);
            color: var(--purple-2);
            font-weight: 600;
          }
        }
        span {
          font-size: calc(var(--font-movil) - 0.7rem);
          letter-spacing: var(--spacing-letter-xs);
          display: flex;
          align-items: center;
          color: var(--purple-2);
          font-weight: 600;
        }

        &-description {
          letter-spacing: var(--spacing-letter);
          line-height: 1.5;
          h3 {
            font-size: calc(var(--font-movil) - 0.5rem);
            color: var(--purple-3);
            font-weight: 600;
          }
          p {
            color: var(--purple-2);
          }

          button {
            background: none;
            border: none;
            font-weight: 700;
            color: var(--purple-1);
            padding: 0;
          }
        }

        &__people {
          display: grid;
          grid-template-columns: 1fr 1fr;
          width: 100%;

          &-director,
          &-producer {
            display: flex;
            flex-direction: column;
            text-align: center;
            h4 {
              font-size: calc(var(--font-movil) - 0.6rem);
              font-weight: 600;
              color: var(--purple-3);
            }
          }
        }
      }
    }
  }
}
</style>