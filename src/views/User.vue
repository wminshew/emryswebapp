<template>
  <div
    id="user"
    class="flex text-left justify-center py-8 mx-auto"
  >
    <div
      class="w-full max-w-lg"
      style="min-height: 70vh;"
    >
      <h2
        style="margin-top:0;"
      >
        User page
      </h2>
      <p>
        <!-- the worlds' GPUs, one command away -->
        WIP
      </p>
      <div
        class="w-full md:flex md:justify-center py-8"
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
