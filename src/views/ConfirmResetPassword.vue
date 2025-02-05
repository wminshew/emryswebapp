<template>
  <div
    id="confirm-password-reset"
    class="px-4 py-8 mx-auto"
  >
    <Alert 
      :alert-visible.sync="alertVisible" 
      :alert-type="alertType"
    >
      {{ alertText | capitalize }}
    </Alert>
    <form
      id="confirm-password-reset-form"
      class="w-full max-w-xs mx-auto"
      action="confirmResetPasswordURL"
      method="post"
      @submit.prevent="postResetPassword"
    >
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
            v-validate="'required|min:8|max:30|verify_password'"
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
          <span
            v-if="errors.has('password')" 
            class="flex w-full text-xs text-red"
          >{{ errors.first('password') }}
          </span>
        </div>
      </div>
      <div class="md:flex md:items-center mt-6">
        <div class="md:w-1/3" />
        <div class="flex md:w-2/3 justify-center items-center">
          <button 
            class="relative btn btn-primary flex items-center justify-center"
            :class="[btnActive ? btnPrimary : btnDisabled]"
            type="submit"
            :disabled="!btnActive"
          >
            <span :class="{ invisible: loading }">
              Set New Password
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

const confirmResetPasswordURL =
  "https://api.emrys.io/auth/confirm-reset-password";

// TODO: move all dict rules & extension to somewhere global
const dict = {
  custom: {
    password: {
      required: "Required",
      min: "Must be at least 8 characters",
      max: "Must be less than 30 characters"
    }
  }
};
Validator.localize("en", dict);
Validator.extend("verify_password", {
  getMessage(field: string) {
    return `The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character (E.g. , . _ & ? etc)`;
  },
  validate(value: string) {
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~])"
    );
    return strongRegex.test(value);
  }
});

export default Vue.extend({
  name: "ConfirmResetPassword",
  components: {
    Alert
  },
  data() {
    const token = this.$route.query.token || "";
    return {
      token,
      password: "",
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
      if (this.password === "" || this.$validator.errors.has("password")) {
        return false;
      }
      return true;
    },
    postResetPassword() {
      this.loading = true;
      if (this.validateForm()) {
        axios({
          method: "post",
          url: confirmResetPasswordURL,
          params: {
            token: this.token
          },
          data: {
            password: this.password
          },
          validateStatus: status => {
            return status >= 200 && status < 300; // axios default
          }
        })
          .then(resp => {
            this.alertType = "success";
            this.alertText = resp.data.trim();
            this.alertVisible = true;
            this.loading = false;
            this.$router.push({
              name: "login",
              query: { alertType: this.alertType, alertText: this.alertText }
            });
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
            this.$router.push({
              name: "login",
              query: { alertType: this.alertType, alertText: this.alertText }
            });
          });
      }
    }
  },
  metaInfo: {
    title: "confirm password reset"
  }
});
</script>
