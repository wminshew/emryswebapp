<template>
  <div
    id="home"
  >
    <div 
      class="relative max-h-screen m-auto overflow-hidden py-32 sm:py-0"
      style="max-height:80vh;"
    >
      <img
        class="h-full"
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
            class="mx-2 mb-4 text-4xl md:text-5xl md:mb-0"
          >
            Affordable cloud GPUs
          </div>
          <div
            class="text-lg md:text-xl mb-6"
          >
            90+% cheaper than leading cloud providers
          </div>
          <div>
            <router-link
              class="ml-6"
              :to="{name: 'register'}"
            >
              <button 
                class="btn btn-primary border-primary border-2"
                style="min-width: 120px;"
                type="button"
              >
                Start with a free trial
              </button>
            </router-link>
          </div>
        </div>
      
      </div>
    </div>
    <div
      class="flex text-left justify-center px-4 pt-16 pb-8 mx-auto"
    >
      <div
        class="w-full max-w-lg"
      >
        <div
          class="mt-8 md:mt-12 md:flex"
        >
          <div
            class="flex flex-col flex-grow items-center align-middle"
          >
            <div
              class="my-auto"
            >
              <h2
                class="pb-4"
                style="margin-top:0;"
              >
                Easy access to fast GPUs
              </h2>
              <span>
                Run python scripts on remote GPUs with <strong>one command</strong>.<br><br class="hidden md:block">Train your model <strong>4-5x faster</strong> with a GTX 1080 Ti (vs K80).
              </span>
            </div>
          </div>
          <div
            class="flex-none overflow-x-auto"
          >
            <img 
              class="inline max-w-lg mt-8 md:mt-2 md:pl-6"
              alt="example emrys run" 
              src="@/assets/user/advanced-example.png"
            >
          </div>
        </div>
        <div
          class="mt-12 md:mt-16 md:flex md:flex-row-reverse"
        >
          <div
            class="flex flex-col flex-grow items-center"
          >
            <div
              class="my-auto"
            >
              <h2
                class="pb-4"
                style="margin-top:0;"
              >
                The fastest GPUs at the lowest prices
              </h2>
              <span>
                Rent Nvidia GTX 2070 for <strong>$0.20 / hr</strong>.
              </span>
            </div>
          </div>
          <div
            class="flex-none flex items-center"
          >
            <img 
              class="max-w-lg mx-auto mt-8 md:mt-2 md:pr-6 lg:pr-16"
              alt="Rent Nvidia GTX 2070 for $0.20 / hr" 
              src="@/assets/user/emrys-network.png"
            >
          </div>
        </div>
        <div
          class="mt-12 md:mt-16 md:flex"
        >
          <div
            class="flex flex-col flex-grow items-center align-middle"
          >
            <div
              class="my-auto"
            >
              <h2
                class="pb-4"
                style="margin-top:0;"
              >
                Jupyter notebooks
              </h2>
              <span>
                Access <strong>remote jupyter kernels</strong> via localhost with one command.
              </span>
            </div>
          </div>
          <div
            class="flex-none overflow-x-hidden"
          >
            <img 
              class="inline max-w-lg mt-8 md:mt-2 md:pl-6"
              alt="example emrys notebook" 
              src="@/assets/user/jupyter-notebook.png"
            >
          </div>
        </div>
        <div
          class="w-full md:flex md:justify-center mt-4 py-8 md:py-16"
        >
          <router-link
            class="md:w-1/4"
            :to="{name: 'docs'}"
          >
            <button 
              class="btn btn-secondary border-2 w-full md:block"
              type="button"
            >
              Documentation
            </button>
          </router-link>
          <router-link
            class="md:w-1/4 md:ml-6"
            :to="{name: 'register'}"
          >
            <button 
              class="btn btn-primary border-primary border-2 w-full mt-4 md:mt-0"
              type="button"
            >
              Start with a free trial
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
