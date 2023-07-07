import {
  SET_ACCESS_TOKEN,
  SET_PROFILE,
  DESTROY_ACCESS_TOKEN,
  DESTROY_PROFILE,
  SET_IMAGES,
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

  //이미지 리스트
  async getImages({ commit }) {
    try {
      const res = await api.get("/images");
      if (res) {
        console.log(res.data.data.images);
        return commit(SET_IMAGES, res.data.data.images);
      }
    } catch (err) {
      alert("이미지 리스트 에러");
    }
  },

  //이미지 추가
  async addImage({ commit }, payload) {
    commit;
    const { name, imageURL, fileSize } = payload;
    try {
      return await api.post("/images", {
        name,
        imageURL,
        fileSize,
      });
    } catch (err) {
      return alert("이미지 추가 에러");
    }
  },

  //이미지 업로드
  async uploadImage({ commit }, payload) {
    commit;
    const { img } = payload;

    let formData = new FormData();
    formData.append("img", img);
    try {
      return await api.post("/images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err) {
      return alert("이미지 업로드 에러");
    }
  },

  //이미지 삭제
  async deleteImage({ commit }, id) {
    commit;
    try {
      return api.delete(`/images/${id}`);
    } catch (err) {
      return alert("이미지 삭제 에러");
    }
  },
};
