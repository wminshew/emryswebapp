<template>
  <div
    id="user"
    class="flex text-left justify-center px-4 py-8 mx-auto"
  >
    <div
      class="w-full max-w-lg"
      style="min-height: 70vh;"
    >
      <h1
        style="margin-top:0;"
      >
        Save time & money with emrys
      </h1>

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
              Cut-rate pricing
            </h2>
            <span>
              Emrys suppliers compete for every job, leading to prices <strong>95+% cheaper</strong> than AWS.
            </span>
          </div>
        </div>
        <div
          class="flex-none flex items-center"
        >
          <img 
            class="max-w-lg mx-auto mt-8 md:mt-2 md:pr-6 lg:pr-16"
            alt="vector image of suppliers competing for emrys jobs" 
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
            Register
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "User",
  metaInfo: {
    title: "users"
  }
});
</script>
