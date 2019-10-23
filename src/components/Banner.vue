<template>
  <router-link
    :to="{name: 'register', query: { promo: bannerPromo }}"
  >
    <div 
      id="banner" 
      class="flex flex-wrap py-1 justify-center border-grey-light shadow-1 bg-primary"
    >
      <div
        class="max-w-lg flex flex-grow flex-no-wrap px-2 py-0 text-lg text-white"
      >
        <span
          class="hidden sm:flex"
        >Register today and get your first week of jobs free!</span>
        <span
          class="text-sm sm:hidden"
        >Register today and get your first week free!</span>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Banner"
});
</script>
