<template>
  <div
    id="app"
    style="height: 100vh;"
  >
    <nav-bar
      :bearer-token.sync="bearerToken"
    />
    <router-view
      class="bg-white"
      :bearer-token.sync="bearerToken"
    />
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";

interface JWT {
  exp: number;
}

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
        localStorage.tokenExp = 0;
      } else {
        const authHeader = "Bearer " + newToken;
        axios.defaults.headers.common.authorization = authHeader;
        const base64Url = newToken.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const parsedClaims: JWT = JSON.parse(window.atob(base64));
        const newExpiration = parsedClaims.exp;
        localStorage.tokenExp = newExpiration;
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
