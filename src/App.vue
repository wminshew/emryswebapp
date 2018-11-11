<template>
  <div id="app">
    <nav-bar :bearer-token.sync="bearerToken" />
    <router-view :bearer-token.sync="bearerToken" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import NavBar from "@/components/NavBar.vue";
import axios from "axios";

export default Vue.extend({
  name: "App",
  components: {
    NavBar
  },
  data() {
    return {
      bearerToken: ""
    };
  },
  watch: {
    bearerToken(newToken) {
      localStorage.bearerToken = newToken;
      if (newToken === "") {
        delete axios.defaults.headers.common.authorization;
      } else {
        const authHeader = "Bearer " + newToken;
        axios.defaults.headers.common.authorization = authHeader;
      }
    }
  },
  beforeMount() {
    if (localStorage.bearerToken) {
      this.bearerToken = localStorage.bearerToken;
    }
  }
});
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
