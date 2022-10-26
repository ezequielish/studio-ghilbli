<template>
  <header>
    <figure id="logo">
      <NuxtLink to="/"> <img :src="logo" /> </NuxtLink>
    </figure>

    <div id="info-user">
      <div v-if="username != ''">
        <p>{{ username }}</p>
        <NuxtLink to="/user">
          <img :src="profileImg" id="profile-img" />
        </NuxtLink>
        <button v-on:click="handleLogout">
          <img :src="logout" width="14px" />
        </button>
      </div>
      <div v-else>
        <NuxtLink to="/login">log in </NuxtLink>
        <NuxtLink to="/register">sign in </NuxtLink>
      </div>
    </div>
  </header>
</template>


<script>
import Logo from "../assets/studig.png";
import Logout from "../assets/logout.png";
import ProfileImg from "../assets/profile.jpg";
import { mapState, mapActions } from "vuex";
export default {
  name: "Header",
  data: () => ({
    menuHandle: false,
    resultSearch: [],
    logo: Logo,
    profileImg: ProfileImg,
    logout: Logout,
  }),

  computed: {
    ...mapState("authStore", ["username"]),
  },
  created() {
    this.$store.dispatch("authStore/setUsername");
  },
  methods: {
    handleLogout: function () {
      this.$store.dispatch("authStore/logoutAuth");
      setTimeout(() => {
        this.$store.dispatch("authStore/setUsername");
      }, 500);
    },
    ...mapActions("authStore", ["logoutAuth", "setUsername"]),
  },
};
</script>

<style  scoped>
header {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 7px;
  justify-content: space-between;
}
#logo {
  padding: 0;
  margin: 0;
  height: 65px;
  width: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#logo a {
  display: flex;
}
#logo img {
  width: 100%;
  border-radius: 7px;
}

#info-user {
  padding-right: 7px;
  font-size: 1.2em;
  display: flex;
  align-items: center;
}
#info-user div {
  display: flex;
  align-items: center;
}

#info-user p {
  margin-right: 14px;
  font-family: "Dosis", system-ui;
}
#info-user a {
  margin-right: 14px;
  font-family: "Dosis", system-ui;
  text-decoration: none;
  color: black;
  font-size: 1.2em;
}

#info-user button {
  background: none;
  border: none;
  margin-top: 7px;
}

.buttom-profile-img {
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  background: none;
  outline: none;
}
#profile-img {
  width: 35px;
  height: 35px;
  object-fit: cover;
  border-radius: 16px;
  margin-right: 14px;
}
</style>