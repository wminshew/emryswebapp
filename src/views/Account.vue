<template>
  <div>
    <div class="home">
      <img 
        alt="emrys logo" 
        src="@/assets/logo.png"
      >
    </div>
    <div>
      <span>Super secure</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Account",
  props: {
    bearerToken: {
      type: String,
      required: true
    }
  }
});
</script>
