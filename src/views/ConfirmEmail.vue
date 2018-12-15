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

const confirmEmailURL = "https://api.emrys.io/auth/confirm-email";

export default Vue.extend({
  name: "ConfirmEmail",
  components: {
    LoadingDots
  },
  data() {
    const token = this.$route.query.token || "";
    return {
      token,
      alertType: "",
      alertText: ""
    };
  },
  mounted() {
    this.postConfirmEmail();
  },
  methods: {
    postConfirmEmail() {
      axios({
        method: "post",
        url: confirmEmailURL,
        params: {
          token: this.token
        },
        validateStatus: status => {
          return status >= 200 && status < 300; // axios default
        }
      })
        .then(resp => {
          this.alertType = "success";
          this.alertText = resp.data.trim();
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
          this.$router.push({
            name: "login",
            query: { alertType: this.alertType, alertText: this.alertText }
          });
        });
    }
  },
  metaInfo: {
    title: "confirm email"
  }
});
</script>
