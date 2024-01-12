<template>
  <Inputs
    :inputs="inputs"
    :textBtn="textBtn"
    @submit="onSubmit"
    @change="onChange"
    :loader="userLoading"
    :strongBtn="true"
    ref="_form"
  />
</template>

<script>
import Inputs from "../forms/Inputs.vue";
import { mapState } from "vuex";
import swal from "sweetalert";

export default {
  name: "UserForm",
  props: {
    textBtn: String,
    resetForm: Boolean,
    to: String,
    action: {
      type: String,
      default: "create",
    },
  },
  components: {
    Inputs,
  },
  computed: {
    ...mapState("userStore", ["inputs", "userAlerts", "userLoading"]),
  },
  methods: {
    onChange: function (ev) {
      const id = ev.target.id;
      const value = ev.target.value;
      if (Object.hasOwn(this.inputs, id)) {
        const payload = [
          {
            key: id,
            value: value,
          },
        ];
        this.$store.dispatch("userStore/setInputValue", payload);
      }
    },
    onSubmit: function () {
      this.$store.dispatch("userStore/userCreate", this.action);
    },
  },

  watch: {
    userAlerts() {
      if (this.userAlerts.message != "") {
        swal({
          title: this.userAlerts.title,
          text: this.userAlerts.message,
          icon: this.userAlerts.type,
          button: "Close!",
        }).then(() => {
          if (this.userAlerts.type == "success") {
            this.$store.dispatch("userStore/resetUserAlerts");
            if (this.resetForm) {
              this.$refs["_form"].$el.reset();
              this.$store.dispatch("userStore/resetInputValues");
            }

            if (this.to) {
              this.$router.push(this.to);
            }
          }
        });
      }
    },
  },
  destroyed() {
    this.$store.dispatch("userStore/resetAlert");
    this.$store.dispatch("userStore/resetInputValues");
  },
};
</script>

