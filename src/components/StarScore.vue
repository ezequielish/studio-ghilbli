<template>
  <div>
    <ul v-if="this.size">
      <span class="score">{{ (this.score * 5) / 100 }}</span>
      <li v-for="(item, index) in this.star" :key="index">
        <img :src="item" alt="icono de estrella" class="img--large" />
      </li>
    </ul>
    <ul v-else>
      <li>
        <img :src="starfull" alt="icono de estrella" class="img--small" />
        {{ (this.score * 10) / 100 }}<span>({{ this.score }})</span>
      </li>
    </ul>
  </div>
</template>

<script>
import StarFull from "../assets/star-full.svg";
import StarMid from "../assets/star-mid.svg";
import StarEmpty from "../assets/star-empty.svg";

export default {
  name: "StarScore",
  data: () => ({
    star: [],
    starfull: StarFull,
  }),
  props: {
    score: Number,
    size: Boolean,
  },

  created() {
    const rate = (this.score * 5) / 100;
    const rateString = rate.toString().split(".");
    if (rateString.length > 0) {
      let fstar = parseInt(rateString[0]);
      let emStar = 5 - fstar;

      //Si no tiene decimal = no tiene estrella por la mitad
      if (rateString.length == 1) {
        if (fstar > 4) {
          this.star = [
            ...Array(fstar).fill(StarFull),
            ...Array(emStar).fill(StarEmpty),
          ];
        }
      } else {
        if (fstar == 1) {
          this.star = [StarFull, ...Array(4).fill(StarEmpty)];
        }
        // en caso que tenga decimal
        const decimal = parseInt(rateString[1].charAt(0));
        if (decimal >= 5 && fstar == 4) {
          this.star = [...Array(fstar).fill(StarFull), StarMid]; //4 Estrellas completas y 1 por la mitad
        }

        if (decimal < 5 && fstar <= 4) {
          // La estrellas y el decimal pasa a una estrella vacia
          this.star = [
            ...Array(fstar).fill(StarFull),
            ...Array(emStar).fill(StarEmpty),
          ];
        }

        if (decimal > 5 && fstar < 4) {
          this.star = [
            ...Array(fstar).fill(StarFull),
            StarMid,
            ...Array(emStar - 1).fill(StarEmpty),
          ];
        }
      }
    }
  },
};
</script>

<style scoped>
ul {
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
}

ul .score {
  font-weight: 700;
  color: var(--purple-4);
  margin-right: var(--spacing-sm-xs);
  margin-top: var(--spacing-sm-xs);
}
ul li {
  display: flex;
  align-items: center;
}

ul li span {
  color: var(--purple-4);
  margin-left: var(--spacing-sm-xs);
}

.img--small {
  width: 15px;
  height: 15px;
}

.img--large {
  width: 20px;
  height: 20px;
}
</style>