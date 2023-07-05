import Vue from "vue";
import Router from "vue-router";
import SignInPage from "@/components/auth/SignInPage";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    //로그인
    {
      path: "/signin",
      component: SignInPage,
      name: "SignInPage",
    },
  ],
});
