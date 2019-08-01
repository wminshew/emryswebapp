<template>
  <div
    id="register"
    class="py-8 px-4"
  >
    <Alert 
      :alert-visible.sync="alertVisible" 
      :alert-type="alertType"
    >
      {{ alertText | capitalize }}
    </Alert>
    <form
      id="register-form"
      class="w-full max-w-xs mx-auto"
      style="min-height: 70vh;"
      action="registerURL"
      method="post"
      @submit.prevent="postRegister"
    >
      <div class="md:flex md:items-center mt-6">
        <div class="md:w-1/3">
          <label 
            class="block text-grey text-left md:text-right mb-1 md:mb-0 pr-4" 
            for="firstName"
          >
            First Name
          </label>
        </div>
        <div class="md:w-2/3">
          <input 
            id="firstName" 
            v-model="firstName"
            v-validate="'required'"
            name="firstName"
            class="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-primary" 
            type="text" 
            placeholder="Satoshi"
            required
          >
        </div>
      </div>
      <div class="text-left md:flex">
        <div class="md:w-1/3" />
        <div class="relative md:w-2/3">
          <span
            v-if="errors.has('firstName')" 
            class="flex w-full text-xs text-red"
          >{{ errors.first('firstName') }}
          </span>
        </div>
      </div>
      <div class="md:flex md:items-center mt-6">
        <div class="md:w-1/3">
          <label 
            class="block text-grey text-left md:text-right mb-1 md:mb-0 pr-4" 
            for="lastName"
          >
            Last Name
          </label>
        </div>
        <div class="md:w-2/3">
          <input 
            id="lastName" 
            v-model="lastName"
            v-validate="'required'"
            name="lastName"
            class="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-primary" 
            type="text" 
            placeholder="Nakamoto"
            required
          >
        </div>
      </div>
      <div class="text-left md:flex">
        <div class="md:w-1/3" />
        <div class="relative md:w-2/3">
          <span
            v-if="errors.has('lastName')" 
            class="flex w-full text-xs text-red"
          >{{ errors.last('lastName') }}
          </span>
        </div>
      </div>
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
          <span
            v-if="errors.has('email')" 
            class="flex w-full text-xs text-red"
          >{{ errors.first('email') }}
          </span>
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
        <div class="md:w-1/3">
          <label 
            class="block text-grey text-left md:text-right mb-1 md:mb-0 pr-4" 
            for="promoCode"
          >
            Promo
          </label>
        </div>
        <div class="md:w-2/3">
          <input 
            id="promoCode" 
            v-model="promoCode"
            name="promoCode"
            class="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-primary" 
            type="text" 
            placeholder=""
            @change="debouncedGetPromo"
          >
        </div>
      </div>
      <div class="text-left md:flex">
        <div class="md:w-1/3" />
        <div class="relative md:w-2/3">
          <span
            v-if="promoValid" 
            class="flex w-full text-xs text-primary"
          > Valid promo
          </span>
        </div>
      </div>
      <div class="text-left md:flex">
        <div class="md:w-1/3" />
        <div class="relative md:w-2/3">
          <span
            v-if="promoInvalid" 
            class="flex w-full text-xs text-red"
          >{{ promoInvalidText | capitalize }}
          </span>
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
import { debounce } from "ts-debounce";

const registerURL = "https://api.emrys.io/auth/account";
const getPromoURL = "https://api.emrys.io/auth/promo";

const dict = {
  custom: {
    email: {
      required: "Required",
      email: "Must be valid email address"
    },
    firstName: {
      required: "Required"
    },
    lastName: {
      required: "Required"
    },
    password: {
      required: "Required",
      min: "Must be at least 8 characters",
      max: "Cannot be greater than 30 characters"
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
  name: "Register",
  components: {
    Alert
  },
  data() {
    return {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      promoCode: this.$route.query.promo || "",
      promoValid: false,
      promoInvalid: false,
      promoInvalidText: "",
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
  created() {
    this.debouncedGetPromo = debounce(this.getPromo, 500);
    if (this.promoCode !== "") {
      this.getPromo();
    }
  },
  methods: {
    debouncedGetPromo() {
      // empty
    },
    getPromo() {
      axios({
        method: "get",
        url: getPromoURL,
        params: {
          promo: this.promoCode
        },
        validateStatus: status => {
          return status >= 200 && status < 300; // axios default
        }
      })
        .then(resp => {
          this.promoValid = true;
          this.promoInvalid = false;
        })
        .catch(error => {
          if (error.response) {
            this.promoInvalidText = error.response.data.trim();
          } else if (error.request) {
            this.promoInvalidText = "Error: no server response received";
          } else {
            this.promoInvalidText = error.message.trim();
          }
          this.promoInvalid = true;
          this.promoValid = false;
        });
    },
    validateForm(): boolean {
      if (!this.checkedTOSAndPrivacy) {
        return false;
      }
      if (!(this.checkedUser || this.checkedSupplier)) {
        return false;
      }
      if (this.firstName === "") {
        return false;
      }
      if (this.lastName === "") {
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
            first_name: this.firstName,
            last_name: this.lastName,
            password: this.password
          },
          params: {
            user: this.checkedUser ? "1" : "",
            miner: this.checkedSupplier ? "1" : "",
            promo: this.promoCode,
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
  },
  metaInfo: {
    title: "register"
  }
});
</script>
