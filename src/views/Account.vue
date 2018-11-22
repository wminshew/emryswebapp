<template>
  <div
    id="account"
    class="flex text-left justify-center py-8 mx-auto"
  >
    <div
      class="max-w-lg"
      style="min-height: 70vh;"
    >
      <h2
        style="margin-top:0;"
      >
        Account
      </h2>
      <p>
        WIP
      </p>
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
