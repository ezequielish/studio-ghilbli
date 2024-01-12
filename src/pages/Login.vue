<template>
  <div class="wrapper-layout__form-auth">
    <LoginHeader title="Log in" class="head-login" color="" />
    <FormInputs
      :inputs="inputs"
      class="wrapper-inputs"
      @submit="handleSubmit"
      @change="handleChange"
      :loader="loading"
      :strongBtn="true"
      textBtn="Log in"
      ref="_form"
    />
    <div class="wrapper-layout__form-user__button">
      <Button
        text="Dont' have an account? Sing up"
        model="mod-2"
        :strong="true"
        :handleBtn="handleBtn"
        :disabled="loading"
      />
    </div>
  </div>
</template>


<script>
import LoginHeader from "../components/LoginHeader.vue";
import Button from "../components/Buttons/Button.vue";
import { mapState } from "vuex";
import { ERROR_LOGIN } from "../store/types/authTypes";
import FormInputs from "../components/forms/Inputs.vue";
import swal from "sweetalert";

export default {
  name: "Login",
  layout: "WrapperLayout",
  components: {
    LoginHeader,
    FormInputs,
    Button,
  },
  computed: {
    ...mapState("authStore", ["loading", "error", "apiToken", "inputs"]),
  },
  methods: {
    handleChange: function (ev) {
      const id = ev.target.id;
      const value = ev.target.value;
      if (Object.hasOwn(this.inputs, id)) {
        const payload = [
          {
            key: id,
            value: value,
          },
        ];
        this.$store.dispatch("authStore/setInputValue", payload).then();
      }
    },
    handleSubmit: function () {
      this.$store.dispatch("authStore/sign").then((resultOk) => {
        if (resultOk) {
          this.$refs["_form"].$el.reset();
          this.$router.push("/");
        }
      });
    },
    handleBtn: function () {
      this.$router.push("/register");
    },
  },
  destroyed() {
    this.$store.commit(`authStore/${ERROR_LOGIN}`, "");
    this.$store.dispatch("authStore/resetInputValues");
  },
  watch: {
    error() {
      if (this.error != "") {
        swal({
          title: "Error!",
          text: this.error,
          icon: "warning",
          button: "Close!",
        }).then(() => {
          this.$store.commit(`authStore/${ERROR_LOGIN}`, "");
        });
      }
    },
    apiToken() {
      if (process.browser && localStorage.getItem("user_sg_token") != null) {
        this.$cookies.set("token_api", this.apiToken);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper-layout__form-user {
  &__button {
    width: calc(100% - 30px);
  }
}

.wrapper-layout__form-auth {
  @media (min-width: 700px) {
    margin: auto;
    max-width: 500px;
  }
}
</style>