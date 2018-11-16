<template>
  <div
    id="app"
    class="flex flex-col h-screen"
    style="height: 100vh;"
  >
    <nav-bar
      style="flex-shrink: 0;"
      :bearer-token.sync="bearerToken"
    />
    <router-view
      style="flex: 1 0 auto;"
      :bearer-token.sync="bearerToken"
    />
    <Footer
      style="flex-shrink: 0;"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";

export default Vue.extend({
  name: "App",
  components: {
    NavBar,
    /* eslint-disable vue/no-unused-components */
    Footer
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
