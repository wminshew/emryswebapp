<template>
  <div 
    id="faq"
    class="flex text-left justify-center px-4 py-8 mx-auto"
  >
    <div
      class="max-w-lg"
    >
      <h1
        class="block md:hidden"
      >
        FAQs
      </h1>
      <h1
        class="hidden md:block"
      >
        Frequently asked questions
      </h1>
      <ul
        id="faq-toc"
      >
        <li
          v-for="faq in faqs"
          :key="faq.id"
        >
          <a
            :href="'#'+faq.id"
          >
            {{ faq.question }} 
          </a>
        </li>
      </ul>
      <br>
      <div
        v-for="faq in faqs"
        :key="faq.id"
      >
        <h2
          :id="faq.id"
        >
          {{ faq.question }} 
          <a
            href="#faq"
          >
            <svg
              class="text-primary fill-current"
              style="padding-top:5px;"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              width="24"
              viewBox="0 0 24 24"
            >
              <g data-name="Layer 2">
                <g data-name="arrow-upward">
                  <rect 
                    width="24" 
                    height="24" 
                    transform="rotate(180 12 12)" 
                    opacity="0"
                  />
                  <path d="M5.23 10.64a1 1 0 0 0 1.41.13L11 7.14V19a1 1 0 0 0 2 0V7.14l4.36 3.63a1 1 0 1 0 1.28-1.54l-6-5-.15-.09-.13-.07a1 1 0 0 0-.72 0l-.13.07-.15.09-6 5a1 1 0 0 0-.13 1.41z" />
                </g>
              </g>
            </svg>
          </a>
        </h2>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p v-html="faq.answer" />
        <br>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

interface FaqObject {
  id: number;
  question: string;
  answer: string;
}

const faqs: FaqObject[] = [
  {
    id: 0,
    question: "Is there documentation?",
    answer: `<a target="_blank" href="https://docs.emrys.io/">Yes</a>.`
  },
  {
    id: 0,
    question: "How is pricing determined?",
    answer: `Each job is second-price auctioned to idle suppliers meeting the user-defined hardware requirements. YMMV, but as a rule of 
        thumb we expect a gtx1080Ti to be available for somewhere between $0.1 and $0.5 / hr (to be refined with more data).`
  },
  {
    id: 0,
    question: "Which GPUs are available?",
    answer: `For now, we only allow relatively new nvidia GPUs on our platform (nothing below gtx9XX). We will refine our cutoff when more data is available.`
  },
  {
    id: 0,
    question: "Can I launch jupyter notebooks?",
    answer: `Today, we only support job-based python script execution. But this feature is very high on our priority list (1Q19, 
        possibly earlier).`
  },
  {
    id: 0,
    question: "How often will I be charged / paid?",
    answer: `Users are charged weekly. Suppliers are paid biweekly.`
  },
  {
    id: 0,
    question: "Will I get paid for idling on the network?",
    answer: `No, suppliers are only paid for jobs completed. However, the client has the ability to run another command while idle on the network. 
        Many of our early suppliers used this to mine cryptocurrencies inbetween jobs.`
  },
  {
    id: 0,
    question: "What happens if I win a job but fail to complete it?",
    answer: `Suppliers are stiffly penalized for failing jobs. Whether this happens accidentally via internet failure or intentionally via 
        manually canceling or hardware fraud (which we monitor closely) does not matter.`
  },
  {
    id: 0,
    question: "Will my machine be secure?",
    answer: `We believe so. Security can never be perfect, but jobs are executed in tightly locked down containers with all kernel capabilities
        dropped and the no-new-privileges flag enabled. Additional security measures are recommnded in our 
        <a target="_blank" href="https://docs.emrys.io/docs/installation/#best-practices">supplier best practices</a>. In the future, we intend 
        to open source our client to further enhance the security.`
  },
  {
    id: 0,
    question: "Will my data set and model be secure?",
    answer: `The short answer to this is no. If you're training with proprietary data, we cannot recommend our platform for you, as
        any supplier could theoretically copy your data set or output weights. We do, however, have plans to tackle this in the future.`
  },
  {
    id: 0,
    question: "What is your mission?",
    answer: `Our mission is to drive humanity forward by making massively parallel compute as cheap & accessible as imaginable.`
  },
  {
    id: 0,
    question: "What is your vision?",
    answer: `As compute continues to commodify, our vision is to become a central clearinghouse through which companies & individuals
        can access compute primatives from a variety of providers without worrying about lock-in.`
  },
  {
    id: 0,
    question: "How can I contact emrys?",
    answer: `There are several ways to reach out, all linked in the <a href='#footer'>footer</a>.`
  }
];
let n = 0;
faqs.forEach(faq => {
  faq.id = n;
  n++;
});

export default Vue.extend({
  name: "FAQ",
  data() {
    return {
      faqs
    };
  }
});
</script>
