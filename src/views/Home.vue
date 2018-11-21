<template>
  <div 
    id="home"
    class="relative max-h-screen m-auto overflow-hidden"
  >
    <img
      class="w-full"
      srcset="../assets/hero-gray-375pt.png 375w,
              ../assets/hero-gray-1200pt.png 1200w"
      sizes="(max-width: 768px) 375px,
              1200px"
      src="../assets/hero-gray-1200pt.png"
      alt="emrys"
    >
    <div
      class="w-full absolute pin flex text-white text-center justify-center items-center"
      style="background: rgba(0, 0, 0, 0.7);"
    >
      <div>
        <div
          class="text-4xl md:text-5xl mb-4"
        >
          Peer to Peer GPU Compute
        </div>
        <div
          class="text-lg md:text-xl mb-6"
        >
          Fast, cheap, efficient.
        </div>
        <div>
          <router-link
            :to="{name: 'user'}"
          >
            <button 
              class="btn btn-secondary border-2"
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
              class="btn btn-secondary border-2"
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
