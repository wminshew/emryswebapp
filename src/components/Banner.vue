<template>
  <router-link
    :to="{name: 'register', query: { promo: bannerPromo }}"
  >
    <div 
      id="banner" 
      class="flex flex-wrap justify-center border-b border-grey-light shadow-1 bg-primary"
    >
      <div
        class="max-w-lg flex flex-grow flex-no-wrap px-2 py-0 text-xs text-white text-left"
      >
        <span>Register with promo {{ bannerPromo }} to receive $50 in emrys credit for your early jobs</span>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import Vue from "vue";

const bannerPromo = "BETA50";

export default Vue.extend({
  name: "Banner",
  data() {
    return {
      bannerPromo
    };
  }
});
</script>
