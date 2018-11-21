<template>
  <div 
    id="footer"
  >
    <div
      class="max-w-lg flex flex-wrap px-4 leading-normal flex-grow items-start justify-center"
    >
      <div
        class="w-full text-center py-4 md:text-left md:w-1/4"
      >
        <h2>Learn more</h2>
        <ul>
          <li>
            <router-link
              :to="{ name: 'about' }"
            >
              About
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'user' }"
            >
              Users
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'supplier' }"
            >
              Suppliers
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'docs' }"
            >
              Documentation
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'terms-of-service' }"
            >
              Terms of Service
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'privacy-policy' }"
            >
              Privacy Policy
            </router-link>
          </li>
        </ul>
      </div>
      <div
        class="w-full text-center py-4 md:text-left md:w-1/4"
      >
        <h2>Contact</h2>
        <ul>
          <li>
            <a href="mailto:support@emrys.io">
              Email
            </a>
          </li>
          <li>
            <a href="https://twitter.com/emrysio">
              Twitter
            </a>
          </li>
          <li>
            <a href="http://forum.emrys.io">
              Forum
            </a>
          </li>
        </ul>
      </div>
      <div
        class="w-full text-center py-4 md:text-left md:w-1/2"
      >
        <h2>Mission</h2>
        <p>Drive humanity forward by making massively parallel compute as cheap & accessible as imaginable.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Footer"
});
</script>
