<template>
  <div>
    <Alert 
      :alert-visible.sync="alertVisible" 
      :alert-type="alertType"
    >
      {{ alertText }}
    </Alert>
    <form class="w-full max-w-xs mx-auto mt-8">
      <div class="md:flex md:items-center mb-6">
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
            name="email"
            class="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-primary" 
            type="email" 
            placeholder="example@domain.com"
          >
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
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
            class="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-primary" 
            type="password" 
            placeholder="****************"
          >
        </div>
      </div>
      <div class="md:flex md:items-center mb-2">
        <div class="md:w-1/3" />
        <div class="md:w-2/3">
          <button 
            class="btn btn-primary " 
            type="submit"
          >
            Login
          </button>
        </div>
      </div>
      <div class="md:flex md:items-center">
        <div class="md:w-1/3" />
        <div class="md:w-2/3">
          <a 
            class="text-xs text-primary hover:text-primary-lighter" 
            style="text-decoration:none;"
            href="#"
          >
            Forgot password?
          </a>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Alert from "@/components/Alert.vue";

export default Vue.extend({
  name: "Login",
  components: {
    Alert
  },
  data() {
    const alertText = this.$route.query.alertText || "";
    let alertType = this.$route.query.alertType;
    if (["success", "warning", "danger"].indexOf(alertType) === -1) {
      alertType = "danger";
    }
    return {
      email: "",
      password: "",
      alertVisible:
        Object.keys(this.$route.query).length > 0 && !(alertText === ""),
      alertType,
      alertText
    };
  }
});
</script>
