<template>
  <div>
    <Alert 
      :alert-visible.sync="alertVisible" 
      :alert-type="alertType"
    >
      {{ alertText | capitalize }}
    </Alert>
    <form 
      id="login-form"
      class="w-full max-w-xs mx-auto py-8"
      action="loginURL"
      method="post"
      @submit.prevent="postLogin"
    >
      <div class="md:flex md:items-center mt-6">
        <div class="md:w-1/3">
          <label 
            class="block text-grey text-left md:text-right mb-1 md:mb-0 pr-4" 
            for="email"
          >
            Email
          </label>
        </div>
        <div class="md:w-2/3">
          <input 
            id="email" 
            v-model="email"
            name="email"
            class="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-primary" 
            type="email" 
            placeholder="example@domain.com"
          >
        </div>
      </div>
      <div class="md:flex md:items-center mt-6">
        <div class="md:w-1/3">
          <label 
            class="block text-grey text-left md:text-right mb-1 md:mb-0 pr-4" 
            for="password"
          >
            Password
          </label>
        </div>
        <div class="md:w-2/3">
          <input 
            id="password" 
            v-model="password"
            class="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-primary" 
            type="password" 
            placeholder="****************"
          >
        </div>
      </div>
      <div class="md:flex mt-6">
        <div class="md:w-1/3" />
        <div class="flex md:w-2/3 justify-center items-center">
          <button 
            class="relative btn btn-primary flex items-center justify-center"
            type="submit"
          >
            <span :class="{ invisible: loading }">
              Login
            </span>
            <img 
              class="absolute w-full h-2 w-2"
              :class="{ invisible: !loading }"
              style="top: calc(50% - 0.25rem);"
              src="@/assets/svg-loaders/three-dots.svg"
            >
          </button>
        </div>
      </div>
      <div class="md:flex md:items-center mt-2">
        <div class="md:w-1/3" />
        <div class="md:w-2/3">
          <router-link 
            :to="{ name: 'reset-password' }"
            class="text-xs text-primary hover:text-primary-lighter" 
            style="text-decoration:none;"
          >
            Forgot password?
          </router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Alert from "@/components/Alert.vue";
import axios from "axios";

const loginURL = "https://api.emrys.io/auth/token";

export default Vue.extend({
  name: "Login",
  components: {
    Alert
  },
  props: {
    bearerToken: {
      type: String,
      required: true
    }
  },
  data() {
    const alertText = this.$route.query.alertText || "";
    let alertType = this.$route.query.alertType;
    if (["success", "warning", "danger"].indexOf(alertType) === -1) {
      alertType = "danger";
    }
    return {
      email: "",
      password: "",
      alertVisible:
        Object.keys(this.$route.query).length > 0 && !(alertText === ""),
      alertType,
      alertText,
      loading: false
    };
  },
  methods: {
    postLogin() {
      if (this.email === "" || this.password === "") {
        this.alertType = "danger";
        this.alertText =
          this.email === ""
            ? "Please enter your email"
            : "Please enter your password";
        this.alertVisible = true;
        return;
      }

      this.loading = true;
      axios({
        method: "post",
        url: loginURL,
        data: {
          email: this.email,
          password: this.password
        },
        params: {
          grantType: "password"
        },
        validateStatus: status => {
          return status >= 200 && status < 300; // axios default
        }
      })
        .then(resp => {
          this.loading = false;
          const token = resp.data.token;
          this.$emit("update:bearerToken", token);
          localStorage.bearerToken = token; // need this so router doesn't block update
          const nextRoute = this.$route.query.redirect || { name: "account" };
          this.$router.push(nextRoute);
        })
        .catch(error => {
          if (error.response) {
            this.alertText = error.response.data.trim();
          } else if (error.request) {
            this.alertText = "Error: no server response received";
          } else {
            this.alertText = error.message.trim();
          }
          this.alertType = "danger";
          this.alertText =
            this.alertText +
            ". Please try again or reach out to support@emrys.io if this continues";
          this.alertVisible = true;
          this.loading = false;
        });
    }
  }
});
</script>
