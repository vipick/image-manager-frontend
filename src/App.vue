<template>
  <v-app id="inspire" v-if="profile">
    <div v-if="isAuthorized">
      <v-navigation-drawer v-model="drawer" app clipped>
        <v-list dense>
          <v-list-item link to="/admin/image">
            <v-list-item-action>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>이미지 관리</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app clipped-left>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title> Image </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-switch
          v-model="switch1"
          :label="`${switchText.toString()}`"
          @click="onClickSwitch"
          color="indigo darken-3"
        ></v-switch>
        <v-spacer></v-spacer>

        <div v-if="isAuthorized">
          <strong>
            <span v-if="profile">
              {{ profile.type }}
              <v-icon>mdi-account</v-icon>
              <span @click="onClickSignout">로그아웃</span>
            </span>
          </strong>
        </div>
        <div v-else>
          <v-list-item link to="/signin">로그인</v-list-item>
        </div>
      </v-app-bar>

      <v-main app>
        <router-view />
      </v-main>

      <v-footer app>
        <span>&copy; {{ new Date().getFullYear() }} image </span>
      </v-footer>
    </div>
  </v-app>
  <v-app v-else>
    <sign-in-page />
  </v-app>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import SignInPage from "./components/auth/SignInPage";

export default {
  name: "App",
  components: {
    SignInPage,
  },
  data: () => ({
    drawer: null,
    isActive: false,
    switch1: false,
    switchText: "Light mode",
  }),
  computed: {
    ...mapGetters(["isAuthorized"]),
    ...mapState(["profile"]),
  },
  methods: {
    onClickSwitch() {
      this.$vuetify.theme.dark = this.switch1;
      if (this.switchText === "Dark mode") {
        this.switchText = "Light mode";
      } else {
        this.switchText = "Dark mode";
      }
    },
    onClickSignout() {
      this.signout().then(() => {
        this.$router.push({ path: "/admin/signin" });
      });
    },
    ...mapActions(["signout"]),
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
};
</script>
<style scoped>
.v-btn {
  margin-left: 5px;
}
.logo {
  margin-left: 5px;
  font-size: 20px;
}
</style>
