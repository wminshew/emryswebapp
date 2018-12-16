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
import socialImage from "@/assets/hero-gray-375pt.png";

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
  },
  metaInfo: {
    title: "home",
    titleTemplate: "%s | emrys",
    links: [{ rel: "canonical", href: "https://www.emrys.io" }],
    meta: [
      {
        httpEquiv: "Content-Type",
        content: "text/html; charset=utf-8"
      },
      {
        httpEquiv: "X-UA-Compatible",
        content: "IE=edge"
      },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { name: "description", content: "p2p GPU compute" },
      // OpenGraph data
      { property: "og:title", content: "home | emrys" },
      { property: "og:site_name", content: "emrys" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.emrys.io" },
      { property: "og:image", content: socialImage },
      { property: "og:description", content: "p2p GPU compute" },
      // Twitter card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "https://www.emrys.io" },
      { name: "twitter:title", content: "home | emrys" },
      { name: "twitter:description", content: "p2p GPU compute" },
      { name: "twitter:creator", content: "@emrysio" },
      {
        name: "twitter:image:src",
        content: socialImage
      },
      // Google / Schema.org markup
      { itemprop: "name", content: "home | emrys" },
      { itemprop: "description", content: "p2p GPU compute" },
      { itemprop: "image", content: socialImage }
    ]
  }
});
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
