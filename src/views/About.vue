<template>
  <div 
    id="about"
    class="flex text-left justify-center px-4 py-8 mx-auto"
  >
    <div
      class="w-full max-w-lg"
      style="min-height: 70vh;"
    >
      <h2
        style="margin-top:0;"
      >
        What is emrys?
      </h2>
      <p>
        Emrys is a cloud GPU marketplace.
      </p>

      <h2>
        Why would I use emrys?
      </h2>
      <p>
        You rent cloud GPUs today and are looking to (significantly) cut costs, or are looking to train many deep learning models in parallel without having to worry about the infrastructure overhead.
      </p>

      <h2>
        How do I use emrys?
      </h2>
      <p>
        Check out the 
        <a 
          target="_blank" 
          href="https://docs.emrys.io"
        >documentation</a>!
      </p>

      <div
        class="w-full md:flex md:justify-center py-8"
      >
        <router-link
          class="md:w-1/4"
          :to="{name: 'faq'}"
        >
          <button 
            class="btn btn-secondary border-2 w-full md:block"
            type="button"
          >
            Learn more
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
  name: "About",
  metaInfo: {
    title: "about"
  }
});
</script>
