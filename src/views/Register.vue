<template>
  <div>
    <Alert 
      :alert-visible.sync="alertVisible" 
      :alert-type="alertType"
    >
      {{ alertText | capitalize }}
    </Alert>
    <form
      id="register-form"
      class="w-full max-w-xs mx-auto py-8"
      action="registerURL"
      method="post"
      @submit.prevent="postRegister"
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
            v-validate="'required|email'"
            name="email"
            class="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-primary" 
            type="email" 
            placeholder="example@domain.com"
            required
          >
        </div>
      </div>
      <div class="text-left md:flex">
        <div class="md:w-1/3" />
        <div class="relative md:w-2/3">
          <p 
            v-if="errors.has('email')" 
            class="absolute w-full text-xs text-red py-1"
          >{{ errors.first('email') }}
          </p>
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
            v-validate="'required|alpha_num|min:8|max:30'"
            name="password"
            class="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-primary" 
            type="password" 
            placeholder="****************"
            required
          >
        </div>
      </div>
      <div class="text-left md:flex">
        <div class="md:w-1/3" />
        <div class="relative md:w-2/3">
          <p 
            v-if="errors.has('password')" 
            class="absolute w-full text-xs text-red py-1"
          >{{ errors.first('password') }}
          </p>
        </div>
      </div>
      <div class="align-middle text-left md:flex md:text-center md:items-center mt-6">
        <div class="md:w-1/3">
          <label 
            class="block text-grey md:text-right mb-1 md:mb-0 pr-4" 
          >
            I want to
          </label>
        </div>
        <label class="block text-grey align-middle mb-1 md:mb-0 md:w-1/3">
          <input 
            id="user"
            v-model="checkedUser"
            class="align-middle"
            type="checkbox"
          >
          <label
            class="text-sm text-grey-dark"
            for="user"
          > Use GPUs</label>
        </label>
        <label class="block text-grey align-middle mb-1 md:mb-0 md:w-1/3">
          <input 
            id="supplier"
            v-model="checkedSupplier"
            class="align-middle"
            type="checkbox"
          >
          <label
            class="text-sm text-grey-dark"
            for="supplier"
          > Supply GPUs</label>
        </label>
      </div>
      <div class="align-middle text-left md:flex md:text-center md:items-center mt-6">
        <div class="md:w-1/3">
          <label 
            class="block text-grey md:text-right mb-1 md:mb-0 pr-4" 
          >
            I agree to
          </label>
        </div>
        <label class="text-grey align-middle mb-1 md:mb-0 md:w-2/3">
          <input 
            id="terms"
            v-model="checkedTOSAndPrivacy"
            class="align-middle"
            type="checkbox"
          >
          <label
            class="text-sm text-grey-dark"
            for="terms"
          >
            <span> the </span>
            <router-link
              :to="{ name: 'terms-of-service' }"
              class="text-sm text-grey-dark"
              style="text-decoration: underline;"
            >ToS</router-link>
            <span> & </span>
            <router-link 
              :to="{ name: 'privacy-policy' }"
              class="text-sm text-grey-dark"
              style="text-decoration: underline;"
            >
              Privacy Policy
            </router-link>
          </label>
        </label>
      </div>
      <div class="md:flex md:items-center mt-6">
        <div class="md:w-1/3" />
        <div class="flex md:w-2/3 justify-center items-center">
          <button 
            class="relative btn flex items-center justify-center"
            :class="[btnActive ? btnPrimary : btnDisabled]"
            type="submit"
            :disabled="!btnActive"
          >
            <span :class="{ invisible: loading }">
              Register 
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
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Alert from "@/components/Alert.vue";
import axios from "axios";
import { Validator } from "vee-validate";

const registerURL = "https://api.emrys.io/auth/account";
// const btnPrimary = "btn-primary";
// const btnDisabled = "btn-disabled";

const dict = {
  custom: {
    email: {
      required: "Required",
      email: "Must be valid email address"
    },
    password: {
      required: "Required",
      alpha_num: "Alphanumeric characters only",
      min: "Must be at least 8 characters",
      max: "Cannot be greater than 30 characters"
    }
  }
};
Validator.localize("en", dict);

export default Vue.extend({
  name: "Register",
  components: {
    Alert
  },
  data() {
    return {
      email: "",
      password: "",
      checkedUser: true,
      checkedSupplier: true,
      checkedTOSAndPrivacy: false,
      alertVisible: false,
      alertType: "success",
      alertText: "",
      loading: false,
      btnPrimary: "btn-primary",
      btnDisabled: "btn-disabled"
    };
  },
  computed: {
    btnActive(): boolean {
      return this.validateForm();
    }
  },
  methods: {
    validateForm(): boolean {
      if (!this.checkedTOSAndPrivacy) {
        return false;
      }
      if (!(this.checkedUser || this.checkedSupplier)) {
        return false;
      }
      if (this.email === "" || this.$validator.errors.has("email")) {
        return false;
      }
      if (this.password === "" || this.$validator.errors.has("password")) {
        return false;
      }
      return true;
    },
    postRegister() {
      this.loading = true;
      if (this.validateForm()) {
        axios({
          method: "post",
          url: registerURL,
          data: {
            email: this.email,
            password: this.password
          },
          params: {
            user: this.checkedUser ? "1" : "",
            miner: this.checkedSupplier ? "1" : "",
            terms: this.checkedTOSAndPrivacy ? "1" : ""
          },
          validateStatus: status => {
            return status >= 200 && status < 300; // axios default
          }
        })
          .then(resp => {
            this.alertType = "success";
            this.alertText =
              "Success! Please check your inbox for our confirmation email.";
            this.alertVisible = true;
            this.loading = false;
          })
          .catch(error => {
            if (error.response) {
              this.alertText = error.response.data.trim(); // TODO
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
  }
});
</script>
