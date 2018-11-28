<template>
  <div 
    v-if="alertVisible"
    class="w-full max-w-xs text-sm mx-auto border px-5 py-3 rounded relative"
    :class="['alert-' + alertType]"
    role="alert"
  >
    <span class="block text-left">
      <slot>Alert: something went wrong</slot>
    </span>
    <span 
      class="absolute pin-t pin-b pin-r px-1 py-1"
      @click="$emit('update:alertVisible', false)"
    >
      <svg 
        class="fill-current h-6 w-6" 
        role="button" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 20 20"
      ><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Alert",
  props: {
    alertVisible: Boolean,
    alertType: {
      type: String,
      required: true,
      validator(value: string) {
        // The value must match one of these strings
        return ["success", "warning", "danger"].indexOf(value) !== -1;
      }
    }
  }
});
</script>
