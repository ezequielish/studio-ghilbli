<template>
  <div class="wrapper">
    <form id="form" v-on:submit="sendLogin">
      <NuxtLink to="/"> <img :src="logo" /> </NuxtLink>

      <div id="input-wrapper">
        <h1>Sign in</h1>
        <Alert
          :clickfn="clearError"
          type="warning"
          :message="error"
          v-if="error !== ''"
        />
        <div class="inputs">
          <span>Email</span>
          <input type="email" required placeholder="Enter your email" />
        </div>
        <div class="inputs">
          <span>Password</span>
          <input
            type="password"
            required
            placeholder="*******"
            v-on:blur="clearError"
          />
        </div>
      </div>

      <button :disabled="loading">
        <p v-if="loading">Loading...</p>
        <p v-else>Log in</p>
      </button>

      <p>Dont' have an account? Sing in</p>
    </form>
  </div>
</template>


<script>
import Logo from "../assets/studig.png";
import Alert from "../components/Alert.vue";
import { mapState } from "vuex";
import { ERROR_LOGIN } from "../store/types/authTypes";

export default {
  name: "Login",
  components: {
    Alert,
  },
  data: () => ({
    logo: Logo,
  }),
  methods: {
    sendLogin: async function (ev) {
      ev.preventDefault();

      try {
        const user = ev.srcElement[0].value;
        const pass = ev.srcElement[1].value;

        const result = await this.$store.dispatch("authStore/sign", {
          user,
          pass,
        });

        if (result) {
          this.$router.push("/");
        } else {
          ev.target.querySelectorAll("input")[1].value = "";
        }
      } catch (error) {
        return false;
      }
    },

    clearError: function () {
      this.$store.commit(`authStore/${ERROR_LOGIN}`, "");
    },
  },
  computed: {
    ...mapState("authStore", ["loading", "error"]),
  },
  mounted() {
    if (window.localStorage.getItem("user_sg") != null) {
      this.$router.push("/");
    }
  },
  destroyed() {
    this.$store.commit(`authStore/${ERROR_LOGIN}`, "");
  },
};
</script>


<style scoped>
.wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
#form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
img {
  width: 105px;
  margin-top: 20px;
  box-shadow: 1px 4px 11px 4px rgb(0 0 0 / 13%);
  border-radius: 7px;
}

#input-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-family: system-ui;
}

.inputs {
  display: inherit;
  justify-content: center;
  flex-direction: inherit;
  width: 270px;
  margin-bottom: 25px;
}

span {
  text-align: left;
  font-family: "Dosis", sans-serif;
  padding: 7px;
}

input {
  padding: 7px;
  border-radius: 7px;
  border: solid #b9b8b8 0.5px;
  outline-color: #b9b8b8;
}

button {
  -webkit-box-shadow: inset -4px -14px 35px -17px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: inset -4px -14px 35px -17px rgba(0, 0, 0, 0.75);
  box-shadow: inset -4px -14px 35px -17px rgba(0, 0, 0, 0.75);
  padding: 9px;
  width: 270px;
  border-radius: 7px;
  border: #c5c2bd;
  background: #2a91c8;
  color: whitesmoke;
  margin-bottom: 7px;
}

button p {
  margin: 0;
}

p {
  font-family: "Dosis", sans-serif;
}
</style>