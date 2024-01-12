<template>
  <div class="container">
    <button
      class="menu-opt"
      v-if="username != ''"
      v-on:click="showMenu = !showMenu"
    >
      <img :src="menuComment" width="100%" v-if="!loading_comment_del" />
      <span v-else>Loading...</span>
    </button>
    <div
      class="container-ul-op"
      v-on:click="showMenu = !showMenu"
      v-if="showMenu"
    >
      <ul class="ul-options">
        <li>
          <button v-on:click="handleDelete" :disabled="loading_comment_del">
            REMOVE
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import MenuComment from "../assets/menucomment.png";
import { mapActions, mapState } from "vuex";
import swal from "sweetalert";

export default {
  name: "MenuCommnet",
  props: {
    ikey: Number,
    commentId: Number,
  },
  data: () => ({
    // menuComment: MenuComment,
    showMenu: false,
    loading_comment_del: false,
  }),
  computed: {
    ...mapState("authStore", ["username"]),
  },
  methods: {
    ...mapActions("filmsStore", ["deleteComment"]),
    handleAlert: function (message) {
      swal({
        title: "Success!",
        text: message,
        icon: "success",
        button: "Close!",
      });
    },
    handleDelete: async function () {
      this.loading_comment_del = true;
      try {
        const idFilm = this.$route.params.id;
        const ikeyComment = this.ikey;
        const idComment = this.commentId;
        const result = await this.deleteComment({
          idFilm,
          ikeyComment,
          idComment,
        });
        this.loading_comment_del = false;
        if (result) {
          this.handleAlert(
            // eslint-disable-next-line no-prototype-builtins
            result.hasOwnProperty("message") ? result.message : ""
          );
        }
      } catch (error) {
        this.loading_comment_del = false;
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.container-ul-op {
  width: 100%;
  height: 100%;
}
.menu-opt {
  width: 29px;
  position: absolute;
  right: 20px;
  top: 14px;
  background: none;
  border: none;
}
.ul-options {
  margin: 0;
  position: absolute;
  right: 32px;
  top: 41px;
  list-style: none;
  background: whitesmoke;
  padding: 7px 7px 10px 7px;
  width: 150px;
  display: flex;
  flex-direction: column;
}

.ul-options li button {
  width: 100%;
  background: #ebeced;
  padding: 7px;
  outline: none;
  border: 1px solid #d5d5d5;
}
</style>
