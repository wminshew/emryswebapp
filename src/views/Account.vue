<template>
  <div
    id="account"
    class="flex text-left justify-center px-4 py-8 mx-auto"
  >
    <div
      class="w-full max-w-lg"
      style="min-height: 70vh;"
    >
      <Alert 
        :alert-visible.sync="alertVisible" 
        :alert-type="alertType"
      >
        {{ alertText | capitalize }}
      </Alert>
      <h2
        style="margin-top:0;"
      >
        Account balance
      </h2>
      <loading-dots
        class="h-8 w-8"
        :loading="loading"
      />
      <div v-show="!loading">
        <p v-if="accountBalance >= 0">
          ${{ accountBalance }} to be paid at week end.
        </p>
        <p v-else>
          ${{ -accountBalance }} to be charged at week end.
        </p>
      </div>
      <h2>
        Payments
      </h2>
      <div 
        v-show="stripeCardLast4 != ''"
      >
        <p>
          Card on file last 4 digits: ${{ stripeCardLast4 }}
        </p>
      </div>
      <form 
        id="payment-form" 
        action="postStripeTokenURL"
        method="post" 
        @submit.prevent="submitCard"
      >
        <label 
          class="text-xs"
          for="card-element"
        >
          <!-- Credit or debit card -->
        </label>
        <div 
          id="card-element" 
          class="w-full md:w-1/2"
          @change="displayCardError"
        >
          <!-- A Stripe Element will be inserted here. -->
        </div>

        <!-- Used to display Element errors. -->
        <div 
          id="card-errors" 
          class="text-xs text-red"
          role="alert"
        />

        <button
          class="btn btn-primary mt-2"
        >
          <span v-if="stripeCardLast4 == ''">
            Submit Card
          </span>
          <span v-else>
            Update Card
          </span>
        </button>
      </form><Paste>
        <h2>
          <router-link
            :to="{
              name: 'confirm-reset-password',
              query: { token: bearerToken }
            }"
          >
            Change password
          </router-link>
        </h2>
    </paste></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Alert from "@/components/Alert.vue";
import LoadingDots from "@/components/LoadingDots.vue";
import axios from "axios";

// TODO: replace with live
// const stripe = Stripe("pk_live_ILLijAFHakqFDTnTa0SSLBKJ");
const stripe = Stripe("pk_test_WUJiWBGxtbnhL8SbkJvLKAn3");
const elements = stripe.elements();
const style = {
  base: {
    fontSize: "16px",
    color: "#2ca532",
    fontSmoothing: "antialiased",
    "::placeholder": {
      color: "#aab7c4"
    }
  },
  invalid: {
    // color: "#fa755a",
    // iconColor: "#fa755a"
    color: "#e3342f",
    iconColor: "#e3342f"
  }
};
let card: stripe.elements.Element;

const getAccountBalanceURL = "https://api.emrys.io/user/balance";
const getAccountStripeCardLast4URL = "https://api.emrys.io/user/stripe/last4";
const postStripeTokenURL = "https://api.emrys.io/user/stripe/token";

export default Vue.extend({
  name: "Account",
  components: {
    Alert,
    LoadingDots
  },
  props: {
    bearerToken: {
      type: String,
      required: true,
      validator: (value: string) => {
        return value !== "";
      }
    }
  },
  data() {
    return {
      accountBalance: 0,
      alertVisible: false,
      alertType: "success",
      alertText: "",
      loading: true,
      stripeCardLast4: ""
    };
  },
  mounted() {
    card = elements.create("card", { style });
    card.mount("#card-element");
    this.getAccountStripeCardLast4();
    this.getAccountBalance();
  },
  methods: {
    getAccountBalance() {
      axios({
        method: "get",
        url: getAccountBalanceURL,
        validateStatus: status => {
          return status >= 200 && status < 300; // axios default
        }
      })
        .then(resp => {
          this.accountBalance = resp.data;
          this.loading = false;
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
    },
    getAccountStripeCardLast4() {
      axios({
        method: "get",
        url: getAccountStripeCardLast4URL,
        validateStatus: status => {
          return status >= 200 && status < 300; // axios default
        }
      })
        .then(resp => {
          this.stripeCardLast4 = resp.data;
          // this.loading = false;
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
          // this.loading = false;
        });
    },
    displayCardError(error: ErrorEvent) {
      const displayError = document.getElementById(
        "card-errors"
      ) as HTMLDivElement;
      if (error) {
        displayError.textContent = error.message;
      } else {
        displayError.textContent = "";
      }
    },
    submitCard(event: Event) {
      stripe.createToken(card).then(result => {
        if (result.error) {
          const errorElement = document.getElementById(
            "card-errors"
          ) as HTMLDivElement;
          errorElement.textContent = result.error.message || null;
        } else {
          this.postStripeToken(result.token as stripe.Token);
        }
      });
    },
    postStripeToken(token: stripe.Token) {
      // const form = document.getElementById("payment-form") as HTMLFormElement;
      // const hiddenInput = document.createElement("input");
      // hiddenInput.setAttribute("type", "hidden");
      // hiddenInput.setAttribute("name", "stripeToken");
      // hiddenInput.setAttribute("value", token.id);
      // form.appendChild(hiddenInput);
      // form.submit();
      const bodyFormData = new FormData();
      console.log(token.id);
      bodyFormData.set("stripeToken", token.id);
      axios({
        method: "post",
        url: postStripeTokenURL,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
        validateStatus: status => {
          return status >= 200 && status < 300; // axios default
        }
      })
        .then(resp => {
          this.alertType = "success";
          this.alertText = "Card successfully added!";
          this.alertVisible = true;
          // TODO: this.loading = false;
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
          // TODO: this.loading = false;
        });
    }
  },
  metaInfo: {
    title: "account"
  }
});
</script>
