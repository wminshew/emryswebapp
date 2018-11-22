<template>
  <div 
    id="about"
    class="flex text-left justify-center px-4 py-8 mx-auto"
  >
    <div
      class="max-w-lg"
      style="min-height: 70vh;"
    >
      <h2
        style="margin-top:0;"
      >
        What is emrys?
      </h2>
      <p>
        Emrys is a peer to peer marketplace for GPU compute.
        Today, that means companies and individuals with idle or underutilized GPUs can rent them out on our network to other 
        companies and individuals looking to use said GPUs.
      </p>

      <h2>
        Why would I use emrys?
      </h2>
      <p>
        As a user, you either use cloud GPUs today and are looking to (significantly) cut costs, or are looking to train many deep learning models in parallel without having to worry about the infrastructure overhead.
      </p>
      <p>
        As a supplier, you either have idle GPUs or are busy cryptomining but looking to earn (significantly) more money.
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
        class="flex justify-center py-8"
      >
        <router-link
          :to="{name: 'faq'}"
        >
          <button 
            class="btn btn-secondary border-2"
            style="min-width: 160px;"
            type="button"
          >
            Learn more
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
