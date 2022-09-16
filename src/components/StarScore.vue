<template>
  <ul>
    <li v-for="(item, index) in this.star" :key="index">
      <img :src="item" />
    </li>
  </ul>
</template>

<script>
import StarFull from "../assets/star-full.svg";
import StarMid from "../assets/star-mid.svg";
import StarEmpty from "../assets/star-empty.svg";

export default {
  name: "StarScore",
  data: () => ({
    star: [],
  }),
  props: {
    score: Number,
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
  list-style: none;
  padding: 0;
  margin: 0;
}
img {
  height: 20px;
  width: 20px;
}
</style>