<template>
  <div
    id="app"
    style="height: 100vh;"
  >
    <banner
      v-show="!loggedIn"
    />
    <nav-bar
      :bearer-token.sync="bearerToken"
    />
    <router-view
      class="bg-white"
      :bearer-token.sync="bearerToken"
    />
    <footer />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Banner from "@/components/Banner.vue";
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";

export default Vue.extend({
  name: "App",
  components: {
    Banner,
    NavBar,
    /* eslint-disable vue/no-unused-components */
    Footer
  },
  data() {
    return {
      bearerToken: ""
    };
  },
  computed: {
    loggedIn(): boolean {
      return this.bearerToken !== "";
    }
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
        localStorage.tokenExp = parsedClaims.exp;
        localStorage.isMiner = parsedClaims.scope.includes("miner");
        localStorage.isUser = parsedClaims.scope.includes("user");
      }
    }
  },
  beforeMount() {
    if (localStorage.bearerToken) {
      this.bearerToken = localStorage.bearerToken;
    }
  },
  metaInfo() {
    return {
      title: "home",
      titleTemplate: "%s | emrys",
      links: [{ rel: "canonical", href: "https://www.emrys.io" }]
    };
  }
});
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
