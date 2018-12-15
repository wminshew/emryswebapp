<template>
  <div
    id="not-found"
    class="flex text-center justify-center px-4 py-8 mx-auto"
  >
    <div
      class="w-full max-w-lg"
      style="min-height: 70vh;"
    >
      We're sorry, we don't recognize the page you've requested.
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "NotFound",
  metaInfo: {
    title: "not found"
  }
});
</script>
