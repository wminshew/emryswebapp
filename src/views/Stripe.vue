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
      <loading-dots
        class="h-8 w-8"
        :loading="loading"
      />
      <div v-show="!loading">
        <div v-if="registeredWithStripe">
          <h2
            style="margin-top:0;"
          >
            Stripe Dashboard
          </h2>
          <div class="flex w-full items-center md:w-auto">
            <a 
              href="https://api.emrys.io/stripe/dashboard"
              target="_blank"
              class="btn btn-primary"
            >
              Launch my stripe dashboard
              <img 
                class="h-6 w-6 py-1 align-middle"
                src="@/assets/svg-new-window/new-window.svg"
              >
            </a>
          </div>
        </div>
        <div v-else>
          <h2
            style="margin-top:0;"
          >
            Connect with Stripe
          </h2>
          <a
            :href="connectWithStripeURL"
          >
            <img 
              src="@/assets/stripe/connect-button/blue-on-light.png" 
              alt="connect with stripe"
            >
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Alert from "@/components/Alert.vue";
import LoadingDots from "@/components/LoadingDots.vue";
import axios from "axios";

const getAccountStripeIDURL = "https://api.emrys.io/user/stripe-id";
const getAccountEmailURL = "https://api.emrys.io/user/email";

const stripeRedirectURI = "https://www.emrys.io/stripe";
// real ID
const stripeClientID = "ca_EmI3qeGAa5WoIvSuiz1wIbgAyP4vcYRw";
// test ID
// const stripeClientID = "ca_EmI3koqRmT9S4fy5Y1U9CdJAMB6PsoFu";

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
  name: "Stripe",
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
      alertType: this.$route.query.alertType || "",
      alertText: this.$route.query.alertText || "",
      alertVisible:
        Object.keys(this.$route.query).length > 0 &&
        !(this.$route.query.alertText === ""),
      connectWithStripeURL,
      loading: true,
      registeredWithStripe: false,
      stripeID: ""
    };
  },
  mounted() {
    if (localStorage.stripeID == null) {
      this.getStripeUserID();
    } else {
      this.stripeID = localStorage.stripeID;
      this.registeredWithStripe = true;
      this.loading = false;
    }
  },
  methods: {
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
            this.loading = false;
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
          this.loading = false;
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
    }
  },
  metaInfo: {
    title: "stripe"
  }
});
</script>
