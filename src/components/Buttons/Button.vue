<template>
  <button
    :class="[model, { strong: strong }]"
    @click="handleClick"
    :disabled="disabled"
  >
    {{ text }}
  </button>
</template>
<script>
export default {
  name: "Button",
  props: {
    text: String,
    model: {
      type: String,
      default: "mod-1",
    },
    strong: Boolean,
    handleBtn: {
      type: Function,
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick: function () {
      this.handleBtn();
    },
  },
};
</script>
<style lang="scss" scoped>
button {
  width: calc(100% - 30px);
  padding: 14px;
  border-radius: 7px;
  border: none;
  box-shadow: var(--shadow-elevation-medium);
  outline: none;
  width: 100%;
  font-size: var(--font-sm);
}

.mod-1 {
  background: var(--purple-5);
  color: var(--purple-10);
}
.mod-2 {
  background: var(--purple-8) !important;
  color: var(--purple-10) !important;
}
.danger{
  background: #8a1212 !important;
  color: #f1f3fc !important;
}
.strong {
  font-weight: 600;
}
</style>

