
<template>
  <router-link :to="{ path: `movie/${id}`, meta: 's' }">
    <div class="wrapper-movie">
      <figure>
        <img
          :src="image"
          @load="onImgLoad"
          loading="lazy"
          :class="{ 'img-active': isLoaded }"
          :alt="title"
        />
      </figure>
      <div class="wrapper-movie__info">
        <p>{{ release_date }}</p>
        <h3>{{ title }}</h3>
        <div class="wrapper-movie__info__row">
          <div class="wrapper-movie__info__row__time">
            <span class="material-symbols-outlined timer-icon"> alarm </span>
            <span class="wrapper-movie__info__row__time__hour"
              >{{ hour }}h {{ minutes }}m</span
            >
          </div>
          <div class="wrapper-movie__info__row__star">
            <StarScore :score="parseInt(score)" />
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
// import PostImg from "../utils/movieimage";
import StarScore from "./StarScore.vue";
export default {
  name: "MovieCard",
  data: () => ({
    hour: 0,
    minutes: 0,
    isLoaded: false,
  }),
  props: {
    index: Number,
    id: String,
    title: String,
    running_time: String,
    release_date: String,
    score: String,
    description: String,
    director: String,
    producer: String,
    date: String,
    image: String,
    handleLikeMovie: Function,
    handleImgLike: Function,
  },
  components: {
    StarScore,
  },
  methods: {
    likeMovie() {
      this.handleLikeMovie(this.id);
      this.idLike = !this.idLike;
    },
    pad: (number) => {
      if (number < 10) {
        return "0" + number;
      }
      return number;
    },
    onImgLoad() {
      this.isLoaded = true;
    },
  },

  computed: {
    backgroundCard: () => {
      return (img) => {
        return {
          "background-image": `url(${img})`,
        };
      };
    },
  },
  created() {
    if (Object.prototype.hasOwnProperty.call(this, "pad")) {
      const min = this.running_time;
      const hour = Math.floor(min / 60);
      const minutes = this.pad(min % 60);
      this.hour = hour;
      this.minutes = minutes;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
a {
  text-decoration: none;
  color: var(--purple-3);
  font-weight: 600;
  .wrapper-movie {
    display: flex;
    align-items: flex-end;
    @media (min-width: 1000px) {
      &:hover {
        box-shadow: var(--shadow-elevation-large);
        background: var(--purple-9);
        border-radius: var(--border-radius-lg-xs) var(--border-radius-sm) var(--border-radius-sm)  var(--border-radius-lg-xs);
        // padding: var(--spacing-sm);
        transition: 0.3s all;
      }
    }

    figure {
      width: 95px;
      height: 120px;
      margin: 0%;
      padding: 0%;
      background: var(--purple-6);
      border-radius: var(--spacing-sm-xl);

      img {
        width: 100%;
        height: 100%;
        object-fit: fill;
        aspect-ratio: 1/1;
        border-radius: inherit;
        opacity: 0;
        transition: opacity 0.6s;
        box-shadow: var(--shadow-elevation-medium);
      }

      .img-active {
        opacity: 1;
      }
    }

    &__info {
      width: 65%;
      padding: var(--spacing-sm);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      p {
        margin: 0;
        font-size: calc(var(--font-movil) - 0.8rem);
        font-weight: 600;
        margin-bottom: var(--spacing-sm-xs);
        color: var(--purple-4);

        @media (min-width: 700px) {
          font-size: calc(var(--font-movil) - 0.9rem);
        }
      }
      h3 {
        font-size: calc(var(--font-movil) - 0.3rem);
        margin-bottom: var(--spacing-sm);
        letter-spacing: var(--spacing-letter-xxs);
        text-shadow: var(--text-shadow);

        @media (min-width: 700px) {
          font-size: calc(var(--font-movil) - 0.5rem);
        }
      }

      &__row {
        display: flex;
        justify-content: space-between;

        &__time {
          display: flex;
          align-items: center;

          span {
            font-size: calc(var(--font-movil) - 0.9rem);
            letter-spacing: var(--spacing-letter-xs);
            font-weight: 600;
          }

          &__hour {
            font-size: calc(var(--font-movil) - 0.9rem);
            margin-left: var(--spacing-sm-xs);
          }
        }

        &__star {
          font-size: calc(var(--font-movil) - 0.9rem);
          color: #bb991f;
          font-weight: 500;

          @media (min-width: 700px) {
            font-size: calc(var(--font-movil) - 1rem);
          }
        }
      }
    }
  }
}
</style>
