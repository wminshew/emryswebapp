<template>
  <div 
    id="home"
    class="relative flex justify-center"
  >
    <!-- <img -->
    <!--   class="absolute w&#45;screen z&#45;0 opacity&#45;50" -->
    <!--   src="../assets/hero&#45;gray.png" -->
    <!--   alt="emrys" -->
    <!-- > -->
    <!-- <img -->
    <!--   class="absolute pin opacity&#45;50 max&#45;w&#45;full w&#45;auto h&#45;auto" -->
    <!--   width="8688" -->
    <!--   height="5792" -->
    <!--   style="z&#45;index: &#45;1;" -->
    <!--   src="../assets/hero&#45;gray.png" -->
    <!--   alt="emrys" -->
    <!-- > -->
    <img
      class="absolute pin opacity-50 max-w-full w-auto h-auto"
      width="8688"
      height="5792"
      src="../assets/hero-gray.png"
      alt="emrys"
    >
    <div
      class="max-w-lg"
    >
      <div
        class="text-center mt-10 md:mt-24"
      >
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
              style="min-width: 100px;"
              type="button"
            >
              Use
            </button>
          </router-link>
          <router-link
            class="ml-5"
            :to="{name: 'supplier'}"
          >
            <button 
              class="btn btn-secondary"
              style="min-width: 100px;"
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
