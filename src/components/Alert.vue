<template>
  <div :class="[type, 'alert']" v-if="show">
    <button v-on:click="closeAlert">X</button>
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: {
    message: String,
    type: String,
    clickfn: Function,
  },
  data: () => ({
    show: true,
  }),

  methods: {
    closeAlert: function () {
      this.clickfn();
      this.show = false;
    },
  },
};
</script>


<style scoped>
.alert {
  padding: 7px;
  height: 25px;
  display: flex;
  align-items: center;
  border-radius: 7px;
  font-size: 0.8em;
  width: 85%;
  margin: 15px 0px 15px 0;
  position: relative;
}
button {
  position: absolute;
  border: none;
  outline: none;
  background: none;
  right: 0;
  top: -2px;
  background: #cbc4c4;
  border-radius: 23px;
  height: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -10px;
  right: -5px;
}

.warning {
  background: #f7d85e;
}
</style>