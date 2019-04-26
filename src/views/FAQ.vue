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
    answer: `For now, we only allow relatively new nvidia GPUs on our 
    platform (nothing below gtx9XX). We will refine our cutoff when more 
    data is available.`
  },
  {
    id: 0,
    question: "How is pricing determined?",
    answer: `Each job is auctioned to idle suppliers meeting 
    the user-defined hardware requirements. YMMV, but as a rule of thumb 
    we expect a gtx1080Ti to be available for somewhere between $0.1 and 
    $0.2 / hr (to be refined with more data).`
  },
  {
    id: 0,
    question: "What fees does emrys charge?",
    answer: `Today, <strong>none</strong>. Obviously we can't run a business 
    like that forever, but we're dedicated to keeping market friction minimized,
    and we'd like to keep longer jobs competitive. We're toying around with a 
    sliding model beginning at 20% and scaling down to 5% as the job lengthens, 
    but will keep participants informed if we make any changes. We're also 
    considering a purely fixed-cost access model, a la CostCo.`
  },
  {
    id: 0,
    question: "Can I launch jupyter notebooks?",
    answer: `Yes! The CLI has a subcommand (emrys notebook) for launching remote
		jupyter kernels, which may then be accessed from your localhost.`
  },
  {
    id: 0,
    question: "How often will I be charged / paid?",
    answer: `Monthly.`
  },
  {
    id: 0,
    question: "Will I get paid for idling on the network?",
    answer: `No, suppliers are only paid for jobs completed. However, the 
    supplier has the ability to run another command while idle on the network. 
    Many suppliers use this to mine cryptocurrencies between jobs.`
  },
  {
    id: 0,
    question: "Can I pay / get paid in crypto?",
    answer: `Not today, but we hope to support more currencies in the future.`
  },
  {
    id: 0,
    question: "What happens if I win a job but fail to complete it?",
    answer: `Suppliers are stiffly penalized for failing jobs. Whether this 
    happens accidentally via internet failure or intentionally via manually 
    canceling or hardware fraud (which we monitor closely) does not matter.`
  },
  {
    id: 0,
    question: "What happens if a miner fails to complete my job?",
    answer: `We expect this to be rare but you will not be charged for the time,
    and will grant add'l credits on a case-by-case basis.`
  },
  {
    id: 0,
    question: `What happens the job is completed but I suspect the miner was somehow fradulent
    (i.e. used hardware less than your requirements)?`,
    answer: `We have extensive supplier checks & monitoring in place and so expect this to be rare,
    but email support for add'l analysis and if confirmed you will be handsomely rewarded.`
  },
  {
    id: 0,
    question: `What if my job exceeds my requested disk quota?`,
    answer: `We have extensive job checks & monitoring in place and if we detect the disk quota is
    exceeded will promptly cancel the job. You will still be charged accordingly. (Disk space is
    relatively cheap, and we require a buffer so we hope this won't happen often.`
  },
  {
    id: 0,
    question: "Will my machine be secure?",
    answer: `We believe so, and our running our own machines on the network. 
		Security can never be perfect, but jobs are executed 
    in tightly locked down containers as unprivileged users with all kernel 
    capabilities dropped and the no-new-privileges flag enabled. Additional 
    security measures are recommnded in our 
    <a
      target="_blank"
      href="https://docs.emrys.io/docs/installation/#best-practices"
    >
      supplier best practices
    </a>. In the future, we intend to open source our client 
    to further enhance the security.`
  },
  {
    id: 0,
    question: "Will my data set and model be secure?",
    answer: `The short answer to this is no. If you're training with 
    proprietary data, we cannot recommend our platform for you, as any 
    supplier could theoretically copy your data set or output weights. 
    We do, however, have plans to tackle this in the future.`
  },
  {
    id: 0,
    question: "What is your mission?",
    answer: `Our mission is to drive humanity forward by making massively 
    parallel compute as cheap & accessible as imaginable.`
  },
  {
    id: 0,
    question: "What is your vision?",
    answer: `As compute continues to commodify, our vision is to become a 
    central clearinghouse through which companies & individuals can access 
    compute primitives from a variety of providers without worrying about 
    lock-in.`
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
