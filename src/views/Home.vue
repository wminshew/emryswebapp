<template>
  <div 
    id="home"
    class="relative"
  >
    <img
      class="opacity-25 w-full"
      width="8688"
      height="5792"
      src="../assets/hero-gray.png"
      alt="emrys"
    >
    <div
      class="w-full absolute pin flex text-center justify-center items-center"
    >
      <div>
        <div
          class="text-4xl md:text-5xl mb-3"
        >
          Peer to Peer GPU Compute
        </div>
        <div
          class="text-lg md:text-xl mb-5"
        >
          Fast, cheap, efficient.
        </div>
        <div>
          <router-link
            :to="{name: 'user'}"
          >
            <button 
              class="btn btn-secondary"
              style="min-width: 120px;"
              type="button"
            >
              Use
            </button>
          </router-link>
          <router-link
            class="ml-6"
            :to="{name: 'supplier'}"
          >
            <button 
              class="btn btn-secondary"
              style="min-width: 120px;"
              type="button"
            >
              Supply
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Home"
});
</script>
