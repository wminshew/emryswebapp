<template>
  <div 
    id="faq"
    class="flex text-left justify-center px-4 py-8 mx-auto"
  >
    <div
      class="w-full max-w-lg"
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
    question: "Which GPUs are available?",
    answer: `For now, we only use relatively new nvidia GPUs on our 
    platform (nothing below gtx9XX). We will refine our cutoff when more 
    data is available.`
  },
  {
    id: 0,
    question: "How is pricing determined?",
    answer: `Each job is auctioned to suppliers meeting 
    the user's hardware requirements. GTX 1080 Ti's are typically available 
    for $0.1-0.2 / hr.`
  },
  {
    id: 0,
    question: "Can I use jupyter notebooks?",
    answer: `Yes! The subcommand 'emrys notebook' will launch a remote
		jupyter kernel accessible via localhost.`
  },
  {
    id: 0,
    question: "How often will I be charged?",
    answer: `Monthly.`
  },
  {
    id: 0,
    question: `What if my job exceeds my requested disk quota?`,
    answer: `We have extensive job checks & monitoring in place. If we detect the disk quota is
    exceeded, your job will be canceled & you will be charged accordingly.`
  },
  {
    id: 0,
    question: "What is your mission?",
    answer: `Making AI affordable & accessible to everyone.`
  },
  {
    id: 0,
    question: "How can I contact emrys?",
    answer: `There are several ways to reach out, all linked in the 
    <a href='#footer'>footer</a>.`
  },
  {
    id: 0,
    question: "Emrys is a funny name. What's it mean?",
    answer: `Emrys is
    <a target='_blank' href='https://en.wikipedia.org/wiki/Merlin'>Merlin</a>'s 
    first name in Welsh. Following Arthur C. Clarke's famous quote ("Any 
      sufficiently advanced technology is indistinguishable from magic"), 
    we believe programming is modern wizardry. But mostly we just like how it 
    sounds.`
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
  },
  mounted() {
    // From testing, without a brief timeout, it won't work.
    setTimeout(() => this.scrollFix(this.$route.hash), 1);
  },
  methods: {
    scrollFix(hashbang: string) {
      if (hashbang !== "") {
        location.href = hashbang;
      }
    }
  },
  metaInfo: {
    title: "faq"
  }
});
</script>
