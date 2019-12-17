<template>
  <div 
    id="nav" 
    class="flex flex-wrap justify-center border-b border-grey-light shadow-1 bg-white"
  >
    <div
      class="max-w-lg flex flex-grow flex-no-wrap px-2 py-2"
    >
      <router-link :to="{ name: 'home' }">
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
        <div class="hidden text-base font-semibold tracking-wide sm:flex sm:items-center lg:flex-grow lg:justify-end">
          <router-link
            v-show="!loggedIn"
            class="navbar-link"
            active-class="navbar-link-current"
            :to="{ name: 'about' }"
          >
            About
          </router-link>
          <router-link
            v-show="!loggedIn"
            class="navbar-link"
            active-class="navbar-link-current"
            :to="{name: 'faq'}"
          >
            FAQ
          </router-link>
          <a
            class="navbar-link"
            active-class="navbar-link-current"
            href="https://docs.emrys.io/"
            target="_blank"
          >
            Docs
          </a>
          <router-link
            v-show="!loggedIn"
            class="navbar-link"
            active-class="navbar-link-current"
            :to="{name: 'login'}"
          >
            Login
          </router-link>
          <!-- <router&#45;link -->
          <!--   v&#45;show="!loggedIn" -->
          <!--   class="navbar&#45;link" -->
          <!--   :to="{name: 'register'}" -->
          <!-- > -->
          <!--   <button  -->
          <!--     class="relative btn btn&#45;primary items&#45;center justify&#45;center" -->
          <!--     type="button" -->
          <!--   > -->
          <!--     Register -->
          <!--   </button> -->
          <!-- </router&#45;link> -->
          <router-link
            v-show="loggedIn"
            class="navbar-link"
            active-class="navbar-link-current"
            :to="{name: 'jobs'}"
          >
            Jobs
          </router-link>
          <router-link
            v-show="loggedIn"
            class="navbar-link"
            active-class="navbar-link-current"
            :to="{name: 'account'}"
          >
            Account
          </router-link>
          <router-link
            v-show="loggedIn"
            class="navbar-link"
            :to="{name: 'home'}"
            @click.native="$emit('update:bearerToken', '')"
          >
            Logout
          </router-link>
        </div>
      </div>
    </div>
    <transition name="slide-fade">
      <div
        v-show="menuOpen"
        class="block w-full text-lg font-semibold tracking-wide overflow-hidden sm:hidden"
      >
        <div
          v-show="!loggedIn"
          class="navbar-dropdown"
        >
          <router-link
            class="navbar-dropdown-text"
            active-class="navbar-dropdown-current"
            :to="{name: 'about'}"
          >
            About
          </router-link>
        </div>
        <div
          v-show="!loggedIn"
          class="navbar-dropdown"
        >
          <router-link
            class="navbar-dropdown-text"
            active-class="navbar-dropdown-current"
            :to="{name: 'faq'}"
          >
            FAQ
          </router-link>
        </div>
        <div
          class="navbar-dropdown"
        >
          <a
            class="navbar-dropdown-text"
            active-class="navbar-dropdown-current"
            href="https://docs.emrys.io/"
            target="_blank"
          >
            Docs
          </a>
        </div>
        <div
          v-show="!loggedIn"
          class="navbar-dropdown"
        >
          <router-link
            class="navbar-dropdown-text"
            active-class="navbar-dropdown-current"
            :to="{name: 'login'}"
          >
            Login
          </router-link>
        </div>
        <!-- <div -->
        <!--   v&#45;show="!loggedIn" -->
        <!--   class="navbar&#45;dropdown" -->
        <!-- > -->
        <!--   <router&#45;link -->
        <!--     class="navbar&#45;dropdown&#45;text text&#45;primary" -->
        <!--     active&#45;class="navbar&#45;dropdown&#45;current" -->
        <!--     :to="{name: 'register'}" -->
        <!--   > -->
        <!--     Register -->
        <!--   </router&#45;link> -->
        <!-- </div> -->
        <div
          v-show="loggedIn"
          class="navbar-dropdown"
        >
          <router-link
            class="navbar-dropdown-text"
            active-class="navbar-dropdown-current"
            :to="{name: 'jobs'}"
          >
            Jobs
          </router-link>
        </div>
        <div
          v-show="loggedIn"
          class="navbar-dropdown"
        >
          <router-link
            class="navbar-dropdown-text"
            active-class="navbar-dropdown-current"
            :to="{name: 'account'}"
          >
            Account
          </router-link>
        </div>
        <router-link
          v-show="loggedIn"
          class="navbar-dropdown"
          :to="{name: 'home'}"
          @click.native="$emit('update:bearerToken', '')"
        >
          Logout
        </router-link>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "NavBar",
  props: {
    bearerToken: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      menuOpen: false
    };
  },
  computed: {
    loggedIn(): boolean {
      return this.bearerToken !== "";
    }
  }
});
</script>
