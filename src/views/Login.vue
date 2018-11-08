<template>
  <form class="w-full max-w-xs mx-auto mt-8">
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label 
          class="block text-grey text-left md:text-right mb-1 md:mb-0 pr-4" 
          for="inline-email"
        >
          Email
        </label>
      </div>
      <div class="md:w-2/3">
        <input 
          id="inline-email" 
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
          for="inline-password"
        >
          Password
        </label>
      </div>
      <div class="md:w-2/3">
        <input 
          id="inline-password" 
          v-model="password"
          class="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-primary" 
          type="password" 
          placeholder="******************"
        >
      </div>
    </div>
    <div class="md:flex md:items-center">
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
          class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" 
          href="#"
        >
          Forgot Password?
        </a>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  }
});
</script>
