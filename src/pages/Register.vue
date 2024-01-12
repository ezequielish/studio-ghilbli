<template>
  <div class="wrapper-layout__form-user">
    <LoginHeader title="Sign in" />
    <UserForm textBtn="Sign up" :resetForm="true" action="create" to="/login" />
    <div class="wrapper-layout__form-user__button">
      <Button
        text="Do you already have an account? Log in "
        model="mod-2"
        :strong="true"
        :handleBtn="handleBtn"
        :disabled="loading"
      />
    </div>
  </div>
</template>


<script>
import UserForm from "../components/User/UserForm.vue";
import LoginHeader from "../components/LoginHeader.vue";
import Button from "../components/Buttons/Button.vue";
import { mapState } from "vuex";
export default {
  name: "Register",
  layout: "WrapperLayout",
  components: { UserForm, LoginHeader, Button },
  computed: {
    ...mapState("authStore", ["loading"]),
  },
  methods: {
    handleBtn: function () {
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper-layout__form-user {
  @media (min-width: 700px) {
    margin: auto;
    max-width: 500px;
  }
  &__button {
    width: calc(100% - 30px);
  }
}
</style>
