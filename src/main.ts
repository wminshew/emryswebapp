import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VeeValidate from "vee-validate";

Vue.config.productionTip = false;
Vue.use(VeeValidate);

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const time = Math.floor(Date.now() / 1000);
    if (localStorage.bearerToken === "") {
      next({
        name: "login",
        query: { redirect: to.fullPath }
      });
    } else if (time > localStorage.tokenExp) {
      next({
        name: "login",
        query: {
          redirect: to.fullPath,
          alertType: "danger",
          alertText: "Login expired, please re-enter your credentials."
        }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

declare global {
  interface JWT {
    exp: number;
  }

  // https://developers.google.com/gtagjs/reference/api
  function gtag(
    command: string,
    params: string | object,
    opts: object | null
  ): void;
}

const GA_TRACKING_ID = "UA-107715418-2";
// const w = window;
router.afterEach((to, from) => {
  // w.gtag("config", GA_TRACKING_ID, { page_path: to.path });
  gtag("config", GA_TRACKING_ID, { page_path: to.path });
});

Vue.filter("capitalize", (value: string) => {
  if (!value) {
    return "";
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
