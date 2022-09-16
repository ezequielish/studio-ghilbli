<script>
import { mapState, mapActions } from "vuex";
import { FILMS_ERROR } from "../store/types/fimlsTypes";

export default {
  name: "Home",
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
    if (!this.films.length) {
      this.getAllFilmsApi();
    }
  },
  destroyed() {
    this.$store.commit(`filmsStore/${FILMS_ERROR}`, "");
  },
};
</script>

