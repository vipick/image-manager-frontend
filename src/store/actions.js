import {
  SET_ACCESS_TOKEN,
  SET_PROFILE,
  DESTROY_ACCESS_TOKEN,
  DESTROY_PROFILE,
} from "./mutations-types";
import api from "@/api";

export default {
  /**
   * [인증]
   */
  //로그인
  async signin({ commit }, payload) {
    const { email, password } = payload;
    commit(DESTROY_PROFILE);
    commit(DESTROY_ACCESS_TOKEN);

    try {
      const resAccessToken = await api.post("/admins/signin", {
        email,
        password,
      });

      if (resAccessToken) {
        const { accessToken } = resAccessToken.data.data;
        commit(SET_ACCESS_TOKEN, accessToken);
      }

      const resProfile = await api.get("/admins/profile");
      if (resProfile) {
        commit(SET_PROFILE, resProfile.data.data.profile);
      }
    } catch (err) {
      if (err.response.data.code === "BAD_REQUEST_INPUT") {
        alert("입력 값을 다시 확인해 주세요");
      } else {
        alert(err.response.data.message);
      }
    }
  },

  async signinByToken({ commit }, token) {
    commit(SET_ACCESS_TOKEN, token);
    try {
      return await api.get("/admins/profile").then((res) => {
        commit(SET_PROFILE, res.data.data.profile);
      });
    } catch (err) {
      this.router.push({ name: "SignInPage" });
    }
  },

  //로그아웃
  signout({ commit }) {
    commit(DESTROY_PROFILE);
    commit(DESTROY_ACCESS_TOKEN);
  },
};
