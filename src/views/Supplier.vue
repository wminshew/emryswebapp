<template>
  <div
    id="supplier"
    class="flex text-left justify-center px-4 py-8 mx-auto"
  >
    <div
      class="w-full max-w-lg"
      style="min-height: 70vh;"
    >
      <h1
        style="margin-top:0;"
      >
        Monetize hardware with emrys
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
              More profitable than mining crypto
            </h2>
            <span>
              Earn <strong>4x more</strong> completing jobs on emrys (vs mining cryptocurrencies).
            </span>
          </div>
        </div>
        <div
          class="flex-none"
        >
          <img 
            class="mt-8 md:mt-2 md:pl-6"
            alt="computer running emrys" 
            src="@/assets/supplier/emrys-computer.png"
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
              Maximum utilization
            </h2>
            <span>
              Mine your cryptocurrency of choice between jobs to <strong>maximize revenue</strong>.
            </span>
          </div>
        </div>
        <div
          class="flex-none flex items-center"
        >
          <img 
            class="max-w-lg mx-auto mt-8 md:mt-2 md:pr-6 lg:pr-16"
            alt="high utilization" 
            src="@/assets/supplier/speedometer.png"
          >
        </div>
      </div>
      <div
        class="mt-12 md:mt-16 md:flex"
      >
        <div
          class="flex flex-col flex-grow align-middle"
        >
          <div
            class="my-auto"
          >
            <h2
              class="pb-4"
              style="margin-top:0;"
            >
              Flexible payouts
            </h2>
            <span>
              Get paid in your currency of choice, coming soon!
            </span>
          </div>
        </div>
        <div
          class="flex-none flex"
        >
          <img 
            class="max-w-lg mx-auto mt-8 md:mt-2 md:pl-6"
            alt="get paid in your currency of choice" 
            src="@/assets/supplier/bitcoin.png"
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
  name: "Supplier",
  metaInfo: {
    title: "suppliers"
  }
});
</script>
