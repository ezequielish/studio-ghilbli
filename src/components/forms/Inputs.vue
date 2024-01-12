<template>
  <form class="wrapper__form" @submit="handleSubmit">
    <div v-for="(input, k) in Object.keys(inputs)" :key="k">
      <div class="wrapper__form__input" v-if="inputs[input].id">
        <span v-if="inputs[input].label">{{ inputs[input].label }}</span>
        <button
          v-if="inputs[input].type == 'password'"
          @click="(ev) => handleShowPassword(ev, inputs[input].id)"
          :id="'button-' + inputs[input].id + '-show'"
          class="eye show"
        >
          <EyeIcon :id="'icon-' + inputs[input].id + '-show'" class="show" />
        </button>
        <button
          v-if="inputs[input].type == 'password'"
          @click="(ev) => handleShowPassword(ev, inputs[input].id)"
          :id="'button-' + inputs[input].id + '-hide'"
          class="eye"
        >
          <EyeClosedIcon :id="'icon-' + inputs[input].id + '-hide'" />
        </button>
        <input
          :type="inputs[input].type"
          :placeholder="inputs[input].placeholder"
          :required="inputs[input].required"
          :id="inputs[input].id"
          :value="inputs[input].value"
          @change="handleChange"
          @keyup="handleKeyup"
          @blur="handleBlur"
          :disabled="loader"
          autocomplete
        />
      </div>
    </div>
    <div
      v-if="textBtn"
      class="wrapper__form__button wrapper__form__button-submit"
    >
      <Loader v-if="loader" />
      <Button :text="textBtn" :strong="strongBtn" v-else />
    </div>
  </form>
</template>


<script>
import Loader from "../Loader.vue";
import Button from "../Buttons/Button.vue";
import EyeIcon from "../icons/eye-icon.vue";
import EyeClosedIcon from "../icons/eye_closed-icon.vue";

export default {
  name: "FormInputs",
  props: {
    inputs: {
      type: Object,
      default: Object,
    },
    textBtn: {
      type: String,
      default: "",
    },

    submit: {
      type: Function,
      default: () => {},
    },
    loader: {
      type: Boolean,
      default: false,
    },
    strongBtn: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Loader,
    Button,
    EyeIcon,
    EyeClosedIcon,
  },
  methods: {
    handleSubmit: function (ev) {
      ev.preventDefault();
      this.$emit("submit");
    },
    handleChange: function (ev) {
      this.$emit("change", ev);
    },
    handleKeyup: function (ev) {
      this.$emit("keyup", ev);
    },
    handleBlur: function (ev) {
      this.$emit("blur", ev);
    },
    handleShowPassword: function (ev, id) {
      ev.preventDefault();

      const inputPassword = document.querySelector(`input#${id}`);
      const buttonsEyeShowPassword = document.querySelector(
        `button#button-${id}-show`
      );
      const buttonsHideShowPassword = document.querySelector(
        `button#button-${id}-hide`
      );
      if (inputPassword.type == "password") {
        inputPassword.setAttribute("type", "text");
      } else {
        inputPassword.setAttribute("type", "password");
      }
      buttonsEyeShowPassword.classList.toggle("show");
      buttonsHideShowPassword.classList.toggle("show");
    },
  },
};
</script>


<style scoped lang="scss">
.wrapper__form {
  width: 100%;
  &__input,
  &__button {
    margin: var(--spacing-md);
    width: calc(100% - 30px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: var(--spacing-md);
    position: relative;

    .eye {
      display: none;
      position: absolute;
      background: none;
      border: none;
      right: 0;
      top: 0;
      margin-top: calc(var(--spacing-md) * 2);
      .icon-tabler-eye,
      .icon-tabler-eye-closed {
        stroke: var(--purple-4);
      }
    }
    .show {
      display: block;
    }
    span {
      padding-bottom: var(--spacing-md);
      font-weight: 600;
      color: var(--purple-3);
      font-size: calc(var(--font-movil) - 0.8rem);
    }
    input {
      width: calc(100% - 30px);
      padding: var(--spacing-md);
      border-radius: var(--border-radius-sm);
      border: none;
      box-shadow: var(--shadow-elevation-medium);
      outline: none;
      background: var(--purple-9);
      color: var(--purple-3);
      font-size: var(--font-sm);

      &::placeholder {
        color: var(--purple-3);
      }
      &:focus {
        background: var(--purple-9);
        box-shadow: var(--shadow-elevation-large);
        border: solid 1px var(--purple-4);
        transition: 0.5s all;
      }
    }
    &-submit {
      margin-top: var(--spacing-lg-xl);
    }
  }
}

.mini-header {
  .wrapper__form {
    width: 100%;
    &__input,
    &__button {
      input {
        width: 100%;
        padding: var(--spacing-sm);
      }
    }
  }
}
</style>