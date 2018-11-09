<template>
  <div>
    <Alert 
      :alert-visible.sync="alertVisible" 
      :alert-type="alertType"
    >
      {{ alertText }}
    </Alert>
    <form
      id="register-form"
      class="w-full max-w-xs mx-auto mt-8"
      action="https://api.emrys.io/user"
      method="post"
      @submit.prevent="postResetPassword"
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
            v-model.lazy="email"
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
        <div class="md:w-1/3" />
        <div class="md:w-2/3">
          <button 
            class="relative btn"
            :class="[btnActive ? btnPrimary : btnDisabled]"
            type="submit"
            :disabled="!btnActive"
          >
            <span :class="{ invisible: loading }">
              Reset Password
            </span>
            <img 
              class="absolute w-full pin-l text-center text-bold h-2 w-2"
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

const resetPasswordURL = "https://api.emrys.io/user/reset-password";

const dict = {
  custom: {
    email: {
      required: "Required",
      email: "Must be valid email address"
    }
  }
};
Validator.localize("en", dict);

export default Vue.extend({
  name: "ResetPassword",
  components: {
    Alert
  },
  data() {
    return {
      email: "",
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
      if (this.$validator.errors.has("email")) {
        return false;
      }
      return true;
    },
    postResetPassword() {
      this.loading = true;
      if (this.validateForm()) {
        axios({
          method: "post",
          url: resetPasswordURL,
          data: {
            email: this.email
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
