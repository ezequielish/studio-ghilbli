<template>
  <div class="wrapper">
    <form id="form" v-on:submit="formSubmit">
      <NuxtLink to="/"> <img :src="logo" /> </NuxtLink>

      <div id="input-wrapper">
        <h1>Sign in</h1>
        <!-- <Alert
          :clickfn="clearError"
          type="warning"
          :message="error"
          v-if="error !== ''"
        /> -->
        <div class="inputs">
          <span>Name</span>
          <input
            :value="name"
            type="text"
            required
            placeholder="Enter your name"
          />
        </div>
        <div class="inputs">
          <span>Email</span>
          <input
            type="email"
            :value="email"
            required
            placeholder="Enter your email"
          />
        </div>
        <div class="inputs">
          <span>Password</span>
          <input
            type="password"
            :required="typeForm == 'user' ? false : true"
            placeholder="*******"
            v-on:blur="clearError"
          />
        </div>
        <div class="inputs">
          <span>Repeat password</span>
          <input
            type="password"
            :required="typeForm == 'user' ? false : true"
            placeholder="*******"
            v-on:blur="clearError"
          />
        </div>
      </div>

      <button>
        <p v-if="userLoading">Loading...</p>
        <p v-else>Sign in</p>
      </button>
    </form>
  </div>
</template>
<script>
import Logo from "../assets/studig.png";
import swal from "sweetalert";
import { mapState } from "vuex";
import { USER_ERROR } from "../store/types/userTypes";

export default {
  name: "UserForm",
  data: () => ({
    logo: Logo,
    typeForm: "",
    name: "",
    email: "",
    formSubmit: "",
  }),
  computed: {
    ...mapState("userStore", ["userError", "userLoading"]),
  },
  beforeCreate() {
    if (this.$route.path == "/register") {
      if (localStorage.getItem("user_sg")) {
        this.$router.push("/");
      }
    }
  },
  created() {
    console.log({
      ff: this.$route,
    });
    if (this.$route.path == "/user") {
      this.typeForm = "user";
      const user =
        localStorage.getItem("user_sg") &&
        JSON.parse(localStorage.getItem("user_sg"));

      this.name = user.name;
      this.email = user.email;
      this.formSubmit = this.editUser;
    }
    if (this.$route.path == "/register") {
      this.typeForm = "register";
      this.formSubmit = this.newUser;
    }
  },
  methods: {
    editUser: async function (ev) {
      ev.preventDefault();
      const form = new FormData();
      const name = ev.srcElement[0].value;
      const email = ev.srcElement[1].value;
      const pass = ev.srcElement[2].value;
      const repetPass = ev.srcElement[3].value;

      if (pass != "") {
        if (pass != repetPass) {
          return swal({
            title: "Error!",
            text: "error password",
            icon: "warning",
            button: "Close!",
          });
        }
        form.append("pwss", pass);
      }

      form.append("name", name);
      form.append("email", email);

      const formValues = {
        form,
        type: "PUT",
      };

      this.$store
        .dispatch("userStore/userCreate", formValues)
        .then((result) => {
          if (result) {
            this.name = name;
            this.email = email;
          }
        });
    },
    newUser: async function (ev) {
      ev.preventDefault();

      const form = new FormData();

      try {
        const name = ev.srcElement[0].value;
        const email = ev.srcElement[1].value;
        const pass = ev.srcElement[2].value;
        const repetPass = ev.srcElement[3].value;

        if (pass != repetPass) {
          return swal({
            title: "Error!",
            text: "the passwords do not match",
            icon: "warning",
            button: "Close!",
          });
        }

        form.append("name", name);
        form.append("email", email);
        form.append("pwss", pass);
        const formValues = {
          form,
          type: "POST",
        };
        const result = await this.$store.dispatch(
          "userStore/userCreate",
          formValues
        );

        if (result) {
          swal({
            title: "Success!",
            text: result,
            icon: "success",
            button: "Close!",
          }).then(() => {
            this.$router.push("/login");
          });
        } else {
          ev.target.querySelectorAll("input")[2].value = "";
          ev.target.querySelectorAll("input")[3].value = "";
        }
      } catch (error) {
        return false;
      }
    },
    handleChangeValue: function (ev) {
      console.log({
        ev: ev.target.value,
      });
    },
    clearError: function () {
      this.$store.commit(`userStore/${USER_ERROR}`, "");
    },
  },
  watch: {
    userError() {
      if (this.userError != "") {
        swal({
          title: "Error!",
          text: this.userError,
          icon: "warning",
          button: "Close!",
        }).then(() => {
          this.$store.commit(`userStore/${USER_ERROR}`, "");
        });
      }
    },
  },
  destroyed() {
    this.$store.commit(`userStore/${USER_ERROR}`, "");
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
  font-family: "Dosis", system-ui;
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
  font-family: "Dosis", system-ui;
}
</style>