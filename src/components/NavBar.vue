<template>
  <div 
    id="nav" 
    class="flex flex-wrap justify-center border-b border-grey-light shadow-1"
  >
    <div
      class="max-w-lg flex flex-no-shrink flex-grow flex-no-wrap mx-2 my-2"
    >
      <router-link to="/">
        <img 
          class="h-8 w-32 items-center mt-1"
          alt="emrys logo" 
          src="@/assets/logo.svg"
          onerror="this.onerror=null; this.src='@/assets/logo.png'"
        >
      </router-link>
      <div class="w-auto flex flex-grow items-center justify-end">
        <div 
          v-show="!menuOpen"
          class="flex sm:hidden"
          role="button"
          @click="menuOpen = true"
        >
          <svg 
            class="navbar-svg"
            viewBox="0 0 20 20"
          >
            <path 
              d="M3.314,4.8h13.372c0.41,0,0.743-0.333,0.743-0.743c0-0.41-0.333-0.743-0.743-0.743H3.314
								c-0.41,0-0.743,0.333-0.743,0.743C2.571,4.467,2.904,4.8,3.314,4.8z M16.686,15.2H3.314c-0.41,0-0.743,0.333-0.743,0.743
								s0.333,0.743,0.743,0.743h13.372c0.41,0,0.743-0.333,0.743-0.743S17.096,15.2,16.686,15.2z M16.686,9.257H3.314
								c-0.41,0-0.743,0.333-0.743,0.743s0.333,0.743,0.743,0.743h13.372c0.41,0,0.743-0.333,0.743-0.743S17.096,9.257,16.686,9.257z"
            />
          </svg>
        </div>
        <div 
          v-show="menuOpen"
          class="flex sm:hidden"
          role="button"
          @click="menuOpen = false"
        >
          <svg 
            class="navbar-svg"
            viewBox="0 0 20 20"
          >
            <path d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z" />
          </svg>
        </div>
        <div class="hidden text-base font-semibold tracking-wide sm:flex lg:flex-grow lg:justify-end">
          <router-link
            class="navbar-link"
            active-class="navbar-link-current"
            to="/about"
          >
            About
          </router-link>
          <router-link
            class="navbar-link"
            active-class="navbar-link-current"
            to="/user"
          >
            User
          </router-link>
          <router-link
            class="navbar-link"
            active-class="navbar-link-current"
            to="/miner"
          >
            Miner
          </router-link>
          <router-link
            class="navbar-link"
            active-class="navbar-link-current"
            to="/login"
          >
            Login
          </router-link>
          <router-link
            class="navbar-link"
            active-class="navbar-link-current"
            to="/register"
          >
            Register
          </router-link>
        </div>
      </div>
    </div>
    <transition name="slide-fade">
      <div
        v-show="menuOpen"
        class="block w-full text-lg font-semibold tracking-wide sm:hidden"
      >
        <router-link
          class="navbar-dropdown"
          active-class="navbar-dropdown-current"
          to="/about"
        >
          About
        </router-link>
        <router-link
          class="navbar-dropdown"
          active-class="navbar-dropdown-current"
          to="/user"
        >
          User
        </router-link>
        <router-link
          class="navbar-dropdown"
          active-class="navbar-dropdown-current"
          to="/miner"
        >
          Miner
        </router-link>
        <router-link
          class="navbar-dropdown"
          active-class="navbar-dropdown-current"
          to="/login"
        >
          Login
        </router-link>
        <router-link
          class="navbar-dropdown"
          active-class="navbar-dropdown-current"
          to="/register"
        >
          Register
        </router-link>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "NavBar",
  data() {
    return {
      menuOpen: false
    };
  }
});
</script>
