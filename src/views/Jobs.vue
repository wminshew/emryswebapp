<template>
  <div
    id="jobs"
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
        History
      </h2>
      <div
        v-if="loading"
      >
        <loading-dots
          class="h-8 w-8"
          :loading="loading"
        />
      </div>
      <div v-else-if="jobHistory.length > 0">
        <span
          v-for="(job, index) in jobHistory"
          :key="index"
        >
          {{ job }}<br>
        </span>
      </div>
      <div v-else>
        <p>
          No job history
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Alert from "@/components/Alert.vue";
import LoadingDots from "@/components/LoadingDots.vue";
import axios from "axios";

const getJobHistoryURL = "https://api.emrys.io/user/job-history";

export default Vue.extend({
  name: "Jobs",
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
      jobHistory: [],
      loading: true
    };
  },
  mounted() {
    this.getJobHistory();
  },
  methods: {
    getJobHistory() {
      axios({
        method: "get",
        url: getJobHistoryURL,
        validateStatus: status => {
          return status >= 200 && status < 300; // axios default
        }
      })
        .then(resp => {
          this.jobHistory = resp.data;
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
  }
});
</script>
