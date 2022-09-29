<template>
  <div class="container-comment-film">
    <li v-for="(comment, index) in comments" :key="index" class="li-comment">
      <figure><img :src="profileImg" id="profile-img" /></figure>
      <div>
        <h3>{{ comment.user.name }}</h3>
        <span>{{ formatDate(comment.updated_at) }}</span>
        <p>{{ comment.comment }}</p>

        <MComment :ikey="index" :commentId="comment.id" />
      </div>
    </li>
  </div>
</template>

<script>
import ProfileImg from "../assets/profile.jpg";
import MComment from "./MenuCommnet.vue";

export default {
  name: "CommentFilm",
  data: () => ({
    profileImg: ProfileImg,
  }),
  computed: {
    formatDate: function () {
      return function (date) {
        const fdate = date.split("T");

        return fdate[0];
      };
    },
  },
  components: {
    MComment,
  },
  props: {
    comments: Array,
  },
};
</script>

<style scoped>
.container-comment-film {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.comments .li-comment {
  display: flex;
  padding: 16px;
  background: #d5d5d5;
  border-radius: 7px;
  box-shadow: 2px 3px 3px rgb(0 0 0 / 20%);
  position: relative;
  margin-top: 7px;
  margin-bottom: 7px;
  width: 85%;
}

.comments .li-comment div {
  display: flex;
  flex-direction: column;
}

.comments figure {
  margin: 0;
  display: flex;
  justify-content: flex-end;
}
.comments h3 {
  margin: 0;
  text-align: left;
  margin-left: 14px;
}

.comments p {
  margin: 0;
  text-align: left;
  margin-left: 14px;
  margin-top: 7px;
}

.comments span {
  margin: 0;
  text-align: left;
  margin-left: 14px;
  font-size: 0.8em;
  color: gray;
  margin-top: 4px;
}

#profile-img {
  height: 44px;
  width: 44px;
  border-radius: 4px;
}

.li-comment:last-child {
  margin-bottom: 95px;
}
@media (min-width: 720px) {
  .comments .li-comment {
    width: 84%;
  }

  .container-comment-film {
    height: 450px;
    overflow-y: scroll;
  }
}
</style>