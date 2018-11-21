<template>
  <div>
    <div class="account">
      <span>Super secure account page</span>
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
      required: true,
      validator: (value: string) => {
        return value !== "";
      }
    }
  }
});
</script>
