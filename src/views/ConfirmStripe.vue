<template>
  <div
    id="confirm-email"
    class="py-8 px-4"
    style="min-height: 70vh;"
  >
    <div
      class="w-full max-w-xs mx-auto"
    >
      <loading-dots
        class="h-8 w-8 mx-auto"
        :loading="true"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import LoadingDots from "@/components/LoadingDots.vue";
import axios from "axios";

const confirmStripeURL = "https://api.emrys.io/user/confirm-stripe";

export default Vue.extend({
  name: "ConfirmStripe",
  components: {
    LoadingDots
  },
  data() {
    const code = this.$route.query.code || "";
    return {
      code,
      alertType: "",
      alertText: ""
    };
  },
  mounted() {
    if (localStorage.stripeState !== this.$route.query.state) {
      this.alertType = "danger";
      this.alertText =
        "Stripe state doesn't match, possible CSRF attack please re-submit to be safe.";
      this.$router.push({
        name: "stripe",
        query: { alertType: this.alertType, alertText: this.alertText }
      });
    } else {
      this.postConfirmStripe();
    }
  },
  methods: {
    postConfirmStripe() {
      axios({
        method: "post",
        url: confirmStripeURL,
        params: {
          code: this.code
        },
        validateStatus: status => {
          return status >= 200 && status < 300; // axios default
        }
      })
        .then(resp => {
          localStorage.stripeID = resp.data;
          this.alertType = "success";
          this.alertText = "Stripe account confirmed!";
          this.$router.push({
            name: "stripe",
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
          this.$router.push({
            name: "stripe",
            query: { alertType: this.alertType, alertText: this.alertText }
          });
        });
    }
  },
  metaInfo: {
    title: "confirm stripe"
  }
});
</script>
