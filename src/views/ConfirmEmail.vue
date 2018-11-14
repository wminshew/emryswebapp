<template>
  <div
    class="flex justify-center w-full max-w-xs mx-auto mt-8"
  >
    <svg 
      class="w-full h-2 w-2"
      width="120" 
      height="30" 
      viewBox="0 0 120 30" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="#000"
    >
      <circle 
        cx="15" 
        cy="15" 
        r="15"
      >
        <animate 
          attributeName="r" 
          from="15" 
          to="15"
          begin="0s" 
          dur="0.8s"
          values="15;9;15" 
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate 
          attributeName="fill-opacity" 
          from="1" 
          to="1"
          begin="0s" 
          dur="0.8s"
          values="1;.5;1" 
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle 
        cx="60" 
        cy="15" 
        r="9" 
        fill-opacity="0.3"
      >
        <animate 
          attributeName="r" 
          from="9" 
          to="9"
          begin="0s" 
          dur="0.8s"
          values="9;15;9" 
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate 
          attributeName="fill-opacity" 
          from="0.5" 
          to="0.5"
          begin="0s" 
          dur="0.8s"
          values=".5;1;.5" 
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle 
        cx="105" 
        cy="15" 
        r="15"
      >
        <animate 
          attributeName="r" 
          from="15" 
          to="15"
          begin="0s" 
          dur="0.8s"
          values="15;9;15" 
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate 
          attributeName="fill-opacity" 
          from="1" 
          to="1"
          begin="0s" 
          dur="0.8s"
          values="1;.5;1" 
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";

const confirmEmailURL = "https://api.emrys.io/auth/confirm-email";

export default Vue.extend({
  name: "ConfirmEmail",
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
  }
});
</script>
