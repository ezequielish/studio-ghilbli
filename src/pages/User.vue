<template>
  <div class="wrapper-layout__form-user">
    <Header />
    <div class="wrapper-layout__form-user-content">
      <h1>Hi, {{ name }}</h1>
      <UserForm textBtn="Update" :resetForm="false" action="update" />
      <Button
        text="DELETE USER"
        model="danger"
        id="delete-user"
        :strong="true"
        :disabled="userLoading"
        :handleBtn="this.handleBtnDelete"
      />
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import UserForm from "../components/User/UserForm.vue";
import Button from "../components/Buttons/Button.vue";
import swal from "sweetalert";

import { mapState } from "vuex";
export default {
  name: "User",
  layout: "WrapperLayout",
  components: { UserForm, Header, Button },
  computed: {
    ...mapState("authStore", ["name", "email", "apiToken"]),
    ...mapState("userStore", ["userAlerts", "userLoading"]),
  },
  created() {
    if (process.browser) {
      if (
        localStorage.getItem("user_sg_token") == null ||
        localStorage.getItem("user_sg_token") == ""
      ) {
        this.$cookies.remove("token_api");
        this.$router.push("login");
      }
      if (this.name == "") {
        this.getUserData();
      }

      this.configRequiredInputs();
      this.fillUserInputValues();
    }
  },
  methods: {
    getUserData: function () {
      this.$store.dispatch("authStore/setUserData");
    },
    configRequiredInputs: function () {
      //password is set to not required
      const passwordsPayload = [
        {
          key: "password",
          value: false,
        },
        {
          key: "repeat_password",
          value: false,
        },
      ];
      this.$store
        .dispatch("userStore/setInputRequired", passwordsPayload)
        .then();
    },
    fillUserInputValues: function () {
      const payloadUser = [
        {
          key: "name",
          value: this.name,
        },
        {
          key: "email",
          value: this.email,
        },
      ];
      this.$store.dispatch("userStore/setInputValue", payloadUser).then();
    },
    handleBtnDelete: async function () {
      await this.$store.dispatch("userStore/userDelete");
    },
  },

  watch: {
    userAlerts() {
      if (
        this.userAlerts.message != "" &&
        this.userAlerts.title == "Success Delete"
      ) {
        swal({
          title: this.userAlerts.title,
          text: this.userAlerts.message,
          icon: this.userAlerts.type,
          button: "Close!",
        }).then(() => {});

        this.$store.dispatch("userStore/resetAlert");
        this.$store.dispatch("authStore/logoutAuth");
        this.$router.push("/");
      }
    },
  },
  destroyed() {
    this.$store.dispatch("userStore/resetAlert");
  },
};
</script>


<style scoped lang="scss">
h1 {
  width: 100%;
  text-align: left;
  font-size: var(--font-md);
  color: var(--purple-2);
  font-weight: 700;
  margin-bottom: var(--spacing-lg-xl);
}

#delete-user {
  margin: var(--spacing-md);
  width: calc(100% - calc(var(--spacing-md) * 2));
}

.wrapper-layout__form-user-content {
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 700px) {
    grid-column: 2;
    margin: auto;
    width: 500px;
    max-width: 500px;
  }
}

@media (min-width: 700px) {
  .wrapper-layout__form-user {
    display: grid;
    grid-template-columns: 12% 88%;
    align-content: center;
  }
}
</style>