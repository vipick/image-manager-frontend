import {
  SET_ACCESS_TOKEN,
  SET_PROFILE,
  DESTROY_ACCESS_TOKEN,
  DESTROY_PROFILE,
  SET_IMAGES,
} from "./mutations-types";
import api from "@/api";
import Cookies from "js-cookie";

export default {
  [SET_ACCESS_TOKEN](state, accessToken) {
    if (accessToken) {
      state.accessToken = accessToken;
      api.defaults.headers.common["Authorization"] = `bearer ${accessToken}`;

      Cookies.set("accessToken", accessToken);
    }
  },
  [SET_PROFILE](state, profile) {
    if (profile) {
      state.profile = profile;
    }
  },
  [DESTROY_ACCESS_TOKEN](state) {
    state.accessToken = "";
    delete api.defaults.headers.common["Authorization"];
    Cookies.remove("accessToken");
  },
  [DESTROY_PROFILE](state) {
    state.profile = null;
  },
  [SET_IMAGES](state, images) {
    if (images) {
      state.images = images;
    }
  },
};
