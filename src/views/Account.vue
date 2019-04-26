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
        Credit
      </h2>
      <loading-dots
        class="h-8 w-8"
        :loading="loading"
      />
      <div v-show="!loading">
        <p>
          ${{ accountCredit / 100 }}
        </p>
      </div>
      <span v-if="isUser">
        <h2>
          <span>Payments</span>
          <img 
            class="pl-4 align-middle"
            src="@/assets/stripe/powered_by_stripe.svg"
          >
        </h2>
        <p>
          A card on file is required to submit jobs to the network; however, it won't be charged until you run out of credits. 
          Learn more about how 
          <!-- <a  -->
          <!--   target="_blank"  -->
          <!--   href="https://www.emrys.io/frequently&#45;asked&#45;questions#2" -->
          <!-- >pricing is determined</a> -->
          <router-link
            :to="{ path: 'frequently-asked-questions#2' }"
          >pricing is determined</router-link>
          on emrys.
        </p>
        <loading-dots
          class="h-8 w-8"
          :loading="loadingStripePayments"
        />
        <div v-show="!loadingStripePayments">
          <div 
            v-show="stripeCardLast4 != ''"
          >
            <p>
              Card on file last 4 digits: {{ stripeCardLast4 }}
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
            />
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
          </form>
        </div>
      </span>
      <span v-if="isMiner">
        <h2>
          <span>Payouts</span>
          <img 
            class="pl-4 align-middle"
            src="@/assets/stripe/powered_by_stripe.svg"
          >
        </h2>
        <loading-dots
          class="h-8 w-8"
          :loading="loadingStripePayouts"
        />
        <div v-show="!loadingStripePayouts">
          <div class="flex w-full items-center md:w-auto">
            <div v-if="registeredWithStripe">
              <button
                class="relative btn btn-primary flex items-center justify-center"
                @click="getAccountStripeDashboard()"
              >
                <span :class="{ invisible: loadingDashboard }">
                  Launch dashboard
                  <img 
                    class="h-6 w-6 py-1 align-middle"
                    src="@/assets/svg-new-window/new-window.svg"
                  >
                </span>
                <img 
                  class="absolute w-full h-2 w-2"
                  :class="{ invisible: !loadingDashboard }"
                  style="top: calc(50% - 0.25rem);"
                  src="@/assets/svg-loaders/three-dots.svg"
                >
              </button>
            </div>
            <div v-else>
              <a
                :href="connectWithStripeURL"
              >
                <button
                  class="relative btn btn-primary flex items-center justify-center"
                >
                  <span :class="{ invisible: loadingDashboard }">
                    Connect with stripe
                    <img 
                      class="h-6 w-6 py-1 align-middle"
                      src="@/assets/svg-new-window/new-window.svg"
                    >
                  </span>
                  <img 
                    class="absolute w-full h-2 w-2"
                    :class="{ invisible: !loadingDashboard }"
                    style="top: calc(50% - 0.25rem);"
                    src="@/assets/svg-loaders/three-dots.svg"
                  >
                </button>
              </a>
            </div>
          </div>
        </div>
      </span>
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
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Alert from "@/components/Alert.vue";
import LoadingDots from "@/components/LoadingDots.vue";
import axios from "axios";

const stripe = Stripe("pk_live_ILLijAFHakqFDTnTa0SSLBKJ");
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

const getAccountCreditURL = "https://api.emrys.io/user/credit";
const getAccountStripeCardLast4URL = "https://api.emrys.io/user/stripe/last4";
const postStripeTokenURL = "https://api.emrys.io/user/stripe/token";

const getAccountStripeIDURL = "https://api.emrys.io/user/stripe-id";
const getAccountEmailURL = "https://api.emrys.io/user/email";
const getAccountStripeDashboardURL =
  "https://api.emrys.io/user/stripe/dashboard";

const stripeRedirectURI = "https://www.emrys.io/stripe";
const stripeClientID = "ca_EmI3qeGAa5WoIvSuiz1wIbgAyP4vcYRw";

let stripeState: string;
if (localStorage.stripeState == null) {
  stripeState = Math.random()
    .toString(36)
    .slice(2);
  localStorage.stripeState = stripeState;
} else {
  stripeState = localStorage.stripeState;
}
const connectWithStripeURL =
  "https://connect.stripe.com/express/oauth/authorize?redirect_uri=" +
  stripeRedirectURI +
  "&client_id=" +
  stripeClientID +
  "&state=" +
  stripeState;

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
      accountCredit: 0,
      alertVisible:
        Object.keys(this.$route.query).length > 0 &&
        !(this.$route.query.alertText === ""),
      alertType: this.$route.query.alertType || "success",
      alertText: this.$route.query.alertText || "",
      connectWithStripeURL,
      isMiner: localStorage.isMiner,
      isUser: localStorage.isUser,
      loading: true,
      loadingDashboard: false,
      loadingStripePayments: true,
      loadingStripePayouts: true,
      registeredWithStripe: false,
      stripeCardLast4: "",
      stripeID: ""
    };
  },
  created() {
    card = elements.create("card", { style });
    this.getAccountStripeCardLast4();
    this.getAccountCredit();
  },
  mounted() {
    card.mount("#card-element");
    if (localStorage.stripeID !== null && localStorage.stripeState !== "") {
      this.getStripeUserID();
    } else {
      this.stripeID = localStorage.stripeID;
      this.registeredWithStripe = true;
      this.loading = false;
    }
  },
  destroyed() {
    card.destroy();
  },
  methods: {
    getAccountCredit() {
      axios({
        method: "get",
        url: getAccountCreditURL,
        validateStatus: status => {
          return status >= 200 && status < 300; // axios default
        }
      })
        .then(resp => {
          this.accountCredit = resp.data;
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
          this.loadingStripePayments = false;
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
          this.loadingStripePayments = false;
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
      axios({
        method: "post",
        url: postStripeTokenURL,
        params: {
          stripeToken: token.id
        },
        validateStatus: status => {
          return status >= 200 && status < 300; // axios default
        }
      })
        .then(resp => {
          this.alertType = "success";
          this.alertText = "Card successfully added!";
          this.alertVisible = true;
          this.getAccountStripeCardLast4();
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
    },
    getStripeUserID() {
      axios({
        method: "get",
        url: getAccountStripeIDURL,
        validateStatus: status => {
          return status >= 200 && status < 300; // axios default
        }
      })
        .then(resp => {
          this.stripeID = resp.data;
          if (this.stripeID !== "") {
            localStorage.stripeID = this.stripeID;
            this.registeredWithStripe = true;
            this.loadingStripePayouts = false;
          } else {
            this.getAccountEmail();
          }
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
          this.loadingStripePayouts = false;
        });
    },
    getAccountEmail() {
      axios({
        method: "get",
        url: getAccountEmailURL,
        validateStatus: status => {
          return status >= 200 && status < 300; // axios default
        }
      })
        .then(resp => {
          const accountEmail = resp.data;
          this.connectWithStripeURL =
            this.connectWithStripeURL + "&stripe_user[email]=" + accountEmail;
          this.loadingStripePayouts = false;
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
          this.loadingStripePayouts = false;
        });
    },
    getAccountStripeDashboard() {
      this.loadingDashboard = true;
      axios({
        method: "get",
        url: getAccountStripeDashboardURL,
        validateStatus: status => {
          return status >= 200 && status < 300; // axios default
        }
      })
        .then(resp => {
          const accountDashboardURL = resp.data;
          this.loadingDashboard = false;
          window.open(accountDashboardURL, "_blank");
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
          this.loadingDashboard = false;
        });
    }
  },
  metaInfo: {
    title: "account"
  }
});
</script>
