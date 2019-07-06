<template>
  <div 
    id="home"
    class="relative max-h-screen m-auto overflow-hidden"
    style="max-height:95vh;"
  >
    <img
      class="w-full"
      srcset="@/assets/hero-gray-375pt.png 375w,
              @/assets/hero-gray-1200pt.png 1200w,
              @/assets/hero-gray-2000pt.png 2000w"
      src="@/assets/hero-gray-2000pt.png"
      alt="emrys"
    >
    <div
      class="w-full absolute pin flex text-white text-center justify-center items-center"
      style="background: rgba(0, 0, 0, 0.7);"
    >
      <div>
        <div
          class="mb-4 text-4xl md:text-5xl md:mb-0"
        >
          Peer to Peer GPU Compute
        </div>
        <div
          class="text-lg md:text-xl mb-6"
        >
          Fast, efficient, effective.
        </div>
        <div>
          <a
            href="https://docs.emrys.io/docs/users/tutorial/"
            target="_blank"
          >
            <button 
              class="btn btn-secondary border-2"
              style="min-width: 120px;"
              type="button"
            >
              Use
            </button>
          </a>
          <a
            class="ml-6"
            href="https://docs.emrys.io/docs/suppliers/config"
            target="_blank"
          >
            <button 
              class="btn btn-secondary border-2"
              style="min-width: 120px;"
              type="button"
            >
              Supply
            </button>
          </a>
        </div>
        <!-- <div> -->
        <!--   <a -->
        <!--     href="https://drift.me/wminshew" -->
        <!--     target="_blank" -->
        <!--   > -->
        <!--     <button  -->
        <!--       id="schedule&#45;meeting&#45;button" -->
        <!--       class="btn btn&#45;primary text&#45;sm font&#45;hairline" -->
        <!--       style="min&#45;width: 120px;" -->
        <!--       type="button" -->
        <!--     > -->
        <!--       Schedule a Demo -->
        <!--     </button> -->
        <!--   </a> -->
        <!-- </div> -->
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
