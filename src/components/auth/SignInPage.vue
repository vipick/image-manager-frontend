<template>
  <div class="signin-page">
    andbut 어드민 로그인
    <sign-in-form @signin="onClickSignIn" />
  </div>
</template>

<script>
import SignInForm from "./SignInForm";
import { mapActions, mapState } from "vuex";

export default {
  name: "SignInPage",
  components: {
    SignInForm,
  },
  methods: {
    onClickSignIn(payload) {
      this.signin(payload).then(() => {
        this.$router.push({ path: "/dashboard" });
      });
    },

    ...mapActions(["signin"]),
  },
  computed: {
    ...mapState(["profile"]),
  },
};
</script>

<style scoped>
.signin-page {
  margin: 10px;
}
</style>
