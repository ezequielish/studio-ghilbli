
<template>
  <div class="frame-movie" :style="backgroundCard(this.image)">
    <router-link :to="`movie/${id}`">
      <h2>{{ title }}</h2>
      <div class="movie-info">
        <div class="movie-info-time">
          <span class="material-symbols-outlined timer-icon"> alarm </span>
          <span>{{ hour }}h {{ minutes }}m</span>
        </div>
        <div class="star-container">
          <StarScore :score="parseInt(score)" />
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
// import PostImg from "../utils/movieimage";
import StarScore from "./StarScore.vue";
export default {
  name: "MovieCard",
  data: () => ({
    hour: 0,
    minutes: 0,
  }),
  props: {
    index: Number,
    id: String,
    title: String,
    running_time: String,
    score: String,
    description: String,
    director: String,
    producer: String,
    date: String,
    image: String,
    handleText: Function,
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
<style scoped>
.frame-movie {
  margin-bottom: 15px;
  object-fit: cover;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border-radius: 6px;
  box-shadow: 4px 37px 70px -58px rgba(0, 0, 0, 0.65);
  -webkit-box-shadow: 4px 37px 70px -58px rgba(0, 0, 0, 0.65);
  -moz-box-shadow: 4px 37px 70px -58px rgba(0, 0, 0, 0.65);
}

.frame-movie a {
  font-family: "Dosis", sans-serif;
  text-decoration: none;
  color: #2d3e4f;
  width: 260px;
  min-width: 260px;
  box-shadow: 0px 5px 9px rgba(0, 0, 0, 0.6);
  height: 365px;
  display: grid;
  grid-template-rows: 20% 50% 30%;
  cursor: pointer;
  transition: 0.4s;
  box-shadow: 1px -220px 130px -38px rgba(0, 0, 0, 0.75) inset;
  -webkit-box-shadow: 1px -220px 130px -38px rgba(0, 0, 0, 0.75) inset;
  -moz-box-shadow: 1px -220px 130px -38px rgba(0, 0, 0, 0.75) inset;
  position: relative;
  border-radius: 6px;
}

.frame-movie h2 {
  position: absolute;
  bottom: 45px;
  color: white;
  font-size: 1.2em;
  margin-left: 25px;
  opacity: 0.8;
}

.movie-info .movie-info-time {
  color: white;
  font-size: 0.9em;
  position: absolute;
  bottom: 35px;
  display: flex;
  align-items: center;
  left: 147px;
}

.movie-info .movie-info-time .timer-icon {
  font-size: 1.2em;
}

.star-container {
  position: absolute;
  bottom: 30px;
  left: 22px;
}
</style>
