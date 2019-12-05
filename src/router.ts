import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  },
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/account",
      name: "account",
      meta: {
        requiresAuth: true
      },
      // route level code-splitting
      // this generates a separate chunk (account.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "account" */ "./views/Account.vue")
    },
    {
      path: "/stripe/confirm",
      name: "stripe-confirm",
      meta: {
        requiresAuth: true
      },
      // route level code-splitting
      // this generates a separate chunk (stripe.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "stripe" */ "./views/ConfirmStripe.vue")
    },
    {
      path: "/jobs",
      name: "jobs",
      meta: {
        requiresAuth: true
      },
      // route level code-splitting
      // this generates a separate chunk (jobs.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "jobs" */ "./views/Jobs.vue")
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/user",
      name: "user",
      // route level code-splitting
      // this generates a separate chunk (user.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "user" */ "./views/User.vue")
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (login.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: Login
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/Login.vue")
    },
    // {
    //   path: "/register",
    //   name: "register",
    //   // route level code-splitting
    //   // this generates a separate chunk (register.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "register" */ "./views/Register.vue")
    // },
    {
      path: "/confirm-email",
      name: "confirm-email",
      // route level code-splitting
      // this generates a separate chunk (confirm-email.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "confirm-email" */ "./views/ConfirmEmail.vue")
    },
    {
      path: "/reset-password",
      name: "reset-password",
      // route level code-splitting
      // this generates a separate chunk (reset-password.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "reset-password" */ "./views/ResetPassword.vue")
    },
    {
      path: "/confirm-reset-password",
      name: "confirm-reset-password",
      // route level code-splitting
      // this generates a separate chunk (confirm-reset-password.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "confirm-reset-password" */ "./views/ConfirmResetPassword.vue")
    },
    {
      path: "/documentation",
      name: "docs",
      beforeEnter() {
        location.href = "https://docs.emrys.io";
      }
      // route level code-splitting
      // this generates a separate chunk (terms-of-service.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () =>
      //   import(/* webpackChunkName: "terms-of-service" */ "./views/TermsOfService.vue")
    },
    {
      path: "/frequently-asked-questions",
      name: "faq",
      // route level code-splitting
      // this generates a separate chunk (faq.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "faq" */ "./views/FAQ.vue")
    },
    {
      path: "/terms-of-service",
      name: "terms-of-service",
      // route level code-splitting
      // this generates a separate chunk (terms-of-service.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "terms-of-service" */ "./views/TermsOfService.vue")
    },
    {
      path: "/privacy-policy",
      name: "privacy-policy",
      // route level code-splitting
      // this generates a separate chunk (privacy-policy.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "privacy-policy" */ "./views/PrivacyPolicy.vue")
    },
    {
      path: "*",
      name: "not-found",
      // route level code-splitting
      // this generates a separate chunk (not-found.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "not-found" */ "./views/NotFound.vue")
    }
  ]
});
