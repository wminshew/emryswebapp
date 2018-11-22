<template>
  <div 
    id="supplier"
    class="flex text-left justify-center py-8 mx-auto"
  >
    <div
      class="max-w-lg"
      style="min-height: 70vh;"
    >
      <h1>Supplier page</h1>
      <div
        class="flex justify-center py-4"
      >
        <router-link
          :to="{name: 'docs'}"
        >
          <button 
            class="btn btn-secondary border-2"
            style="min-width: 160px;"
            type="button"
          >
            Documentation
          </button>
        </router-link>
        <router-link
          class="ml-6"
          :to="{name: 'register'}"
        >
          <button 
            class="btn btn-primary border-primary border-2"
            style="min-width: 160px;"
            type="button"
          >
            Register
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>
