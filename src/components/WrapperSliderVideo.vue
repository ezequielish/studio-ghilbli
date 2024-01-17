


<template>
  <div class="wrapper">
    <div
      class="wrapper__video"
      :class="{ 'wrapper__video--radius': borderRadius }"
      v-if="!video.play"
    >
      <figure
        v-for="(item, index) in items"
        :key="index"
        :class="{ 'wrapper__video--active': index == controlCarrousel.active }"
        v-touch:swipe.left="onSwipeLeft"
        v-touch:swipe.rigth="onSwipeRigth"
      >
        <img
          :src="item.movie_banner"
          :class="{ 'img-active': isLoaded, 'img-radius': borderRadius }"
          @load="onImgLoad(index)"
          :alt="item.title"
        />
        <div
          class="wrapper__backdrop"
          :class="{ 'wrapper__backdrop--radius': borderRadius }"
        >
          <div class="wrapper__backdrop__info">
            <div v-if="showInfo && item.title">
              <p v-if="showInfo.title">{{ item.title }}</p>
              <StarScore
                v-if="showInfo.scoreStar && item.rt_score > 0"
                :score="parseInt(item.rt_score)"
                :size="true"
                class="stars-wrapper"
              />
            </div>
            <button
              name="play"
              aria-label="play"
              title="play"
              @click="handleClickVideo"
              v-if="item.title"
            >
              <PlayIcon />
            </button>
          </div>
        </div>
      </figure>
    </div>
    <div
      class="wrapper__video"
      :class="{ 'wrapper__video--radius': borderRadius }"
      v-else
    >
      <div
        class="wrapper__video__frame"
        :class="{
          'wrapper__video__frame--active': idxv == controlCarrousel.active,
          'wrapper__video__frame--radius': borderRadius,
        }"
        v-for="(item, idxv) in items"
        :key="idxv"
      >
        <iframe
          width="100%"
          :height="video.screen.height"
          :class="{ 'frame-radius': borderRadius }"
          :src="
            'https://www.youtube.com/embed/' + getMovieInfo(item) ||
            '' + video.ytAutoPlay
          "
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          v-if="idxv == controlCarrousel.active"
        ></iframe>
      </div>
    </div>
    <div class="wrapper__video__circles" v-if="controls">
      <div
        v-for="(circleCarrousel, indx) in controlCarrousel.items.length"
        :key="'c-' + indx"
        @click="selectImg(indx)"
        :class="{
          'wrapper__video__circles--active': indx == controlCarrousel.active,
        }"
      ></div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Vue2TouchEvents from "vue2-touch-events";
import PlayIcon from "./icons/play-icon.vue";
import StarScore from "../components/StarScore.vue";

Vue.use(Vue2TouchEvents);

export default {
  name: "WrapperSliderVideo",
  components: {
    PlayIcon,
    StarScore,
  },
  props: {
    items: Array,
    borderRadius: Boolean,
    controls: Boolean,
    showInfo: Object,
  },

  data: () => ({
    controlCarrousel: {
      items: [],
      init: 0,
      maxItem: 3,
      active: 0,
    },
    video: {
      play: false,
      autoplay: true,
      ytAutoPlay: "&autoplay=1",
      player: "",
      screen: {
        height: 0,
        width: "100%",
      },
    },
    isLoaded: false,
  }),
  computed: {
    getMovieInfo: function () {
      return (item) => {
        const result = this.$store.getters[
          "producersDirectorsStore/getPersonByIdMovie"
        ](item.id);
        return result.video_id || "";
      };
    },
  },
  methods: {
    handleClickVideo() {
      this.video.play = true;
    },
    onImgLoad() {
      this.isLoaded = true;
    },
    selectImg(idx) {
      this.controlCarrousel.active = idx;
      this.video.play = false;
    },
    onSwipeLeft() {
      if (this.controlCarrousel.active < this.controlCarrousel.maxItem) {
        this.controlCarrousel.active = this.controlCarrousel.active + 1;
        this.video.play = false;
      }
    },
    onSwipeRigth() {
      if (this.controlCarrousel.active > 0) {
        this.controlCarrousel.active = this.controlCarrousel.active - 1;
        this.video.play = false;
      }
    },
    onResize() {
      if (window.innerWidth <= 750) {
        if (
          window.matchMedia("(orientation: landscape)").matches &&
          screen.orientation.type == "landscape-primary"
        ) {
          this.video.screen.height = window.innerHeight;
        } else {
          this.video.screen.height =
            this.showInfo?.mediaQuery?.sm?.height || "50%";
        }
      }

      if (window.innerWidth > 750 && window.innerWidth < 1000) {
        this.video.screen.height =
          this.showInfo?.mediaQuery?.md?.height || "100%";
      }

      if (window.innerWidth > 1000) {
        this.video.screen.height =
          this.showInfo?.mediaQuery?.lg?.height || "50%";
      }
    },
    setControlCarrousel() {
      if (this.items.length) {
        this.controlCarrousel.items = [...this.items];
      }
    },
  },
  created() {
    this.setControlCarrousel();
    this.$nextTick(() => {
      if (process.browser) {
        this.onResize();
        window.addEventListener("resize", this.onResize);
      }
    });
  },
  watch: {
    items() {
      if (this.items.length) {
        this.controlCarrousel.items = [...this.items];
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrapper {
  &__video {
    height: inherit;
    overflow: hidden;
    background: var(--purple-6);
    &--radius {
      border-radius: var(--border-radius-lg-xs);
    }
    figure {
      margin: 0;
      padding: 0;
      height: 0;
      width: 100%;
      opacity: 0;
      transition: opacity 0.6s;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        aspect-ratio: 1/1;
        box-shadow: var(--shadow-elevation-large);
        opacity: 0;
      }
      .img-radius {
        border-radius: var(--border-radius-lg-xs);
      }
      .wrapper__backdrop {
        height: 100%;
        width: 100%;
        background: var(--color-dark-transparent);
        position: absolute;
        top: 0;
        box-shadow: -2px -46px 91px 33px rgb(40 34 80 / 75%) inset;
        -webkit-box-shadow: -2px -46px 91px 33px rgb(40 34 80 / 75%) inset;
        -moz-box-shadow: -2px -46px 91px 33px rgb(40 34 80 / 75%) inset;

        &--radius {
          border-radius: var(--border-radius-lg-xs);
        }
        &__info {
          display: flex;
          justify-content: center;
          height: 90%;
          width: 75%;
          align-items: flex-end;
          justify-content: flex-start;
          p {
            font-size: var(--font-movil);
            margin: 0;
            margin-left: var(--spacing-lg-xl);
            color: var(--text-wrapper-movie);
            font-weight: 700;
            background: var(--color-dark-transparent);
            padding: var(--spacing-sm-xs);
            width: 90%;
            @media (min-width: 1000px) {
              font-size: calc(var(--font-desktop) - 0.5rem);
            }
          }
          .stars-wrapper {
            margin-left: calc(var(--spacing-md) * 2);
          }

          button {
            background: var(--purple-9);
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: var(--spacing-lg-xl);
            border-radius: calc(var(--border-radius-lg) * 2);
            width: 55px;
            height: 55px;
            position: absolute;
            border: none;
            outline: none;
            right: var(--spacing-lg-xl);
            @media (min-width: 1000px) {
              width: 69px;
              height: 69px;
            }
            svg {
              stroke: var(--purple-3);
              fill: var(--purple-3);
              height: 30px;
              width: 35px;

              @media (min-width: 1000px) {
                width: 40px;
                height: 40px;
              }
            }
          }
        }
      }
    }

    iframe {
      overflow: hidden;
    }
    .frame-radius {
      border-radius: var(--border-radius-lg-xs);
    }

    &__frame {
      padding-bottom: 56.25%;
      display: none;

      &--active {
        display: block !important;
      }
    }
    &--active {
      height: 100% !important;
      animation: fadeIn ease 0.6s forwards;
      -webkit-animation: fadeIn ease 0.6s forwards;
      -moz-animation: fadeIn ease 0.6s forwards;
      -o-animation: fadeIn ease 0.6s forwards;
      -ms-animation: fadeIn ease 0.6s forwards;
    }
    &__circles {
      width: 100%;
      background: transparent;
      height: 5vh;
      position: absolute;
      bottom: -45px;
      display: grid;
      grid-template-columns: repeat(4, 45px);
      grid-gap: var(--spacing-sm-xs);
      justify-items: center;
      align-items: center;
      justify-content: center;
      div {
        height: 10px;
        width: 10px;
        border: solid var(--purple-9) 1px;
        border-radius: calc(var(--border-radius-lg) * 2);
        background: var(--purple-9);
        @media (min-width: 1000px) {
          cursor: pointer;
          height: 18px;
          width: 18px;
        }
      }

      &--active {
        height: 18px;
        width: 40px !important;
        border: solid var(--purple-7) 1px !important;
        background: var(--purple-7) !important;
        transition: width 0.5s;
      }
    }
  }

  .img-active {
    animation: fadeIn ease 0.6s forwards;
    -webkit-animation: fadeIn ease 0.6s forwards;
    -moz-animation: fadeIn ease 0.6s forwards;
    -o-animation: fadeIn ease 0.6s forwards;
    -ms-animation: fadeIn ease 0.6s forwards;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-moz-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-o-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-ms-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
