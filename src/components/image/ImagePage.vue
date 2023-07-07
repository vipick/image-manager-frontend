<template>
  <div class="image-page">
    <span>이미지 관리</span>
    <image-add-form @addImage="onClickAddImage" />

    <v-row justify="center" align="center">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">번호</th>
              <th class="text-left">파일 명</th>
              <th class="text-left">파일 크기</th>
              <th class="text-left">이미지</th>
              <th class="text-left">생성날짜</th>
              <th class="text-left"></th>
            </tr>
          </thead>

          <tbody v-if="images">
            <image-list-view
              v-for="(image, index) in images"
              :key="image.id"
              :image="image"
              :index="images.length - index"
            />
          </tbody>
        </template>
      </v-simple-table>
    </v-row>
  </div>
</template>

<script>
import imageAddForm from "./ImageAddForm";
import imageListView from "./ImageListView";
import { mapActions, mapState } from "vuex";

export default {
  name: "imagePage",
  components: {
    imageAddForm,
    imageListView,
  },

  async created() {
    await this.getImages();
  },
  methods: {
    async onClickAddImage(payload) {
      await this.addImage(payload);
      await this.getImages();
    },
    ...mapActions(["addImage", "uploadImage", "getImages"]),
  },
  computed: {
    ...mapState(["images"]),
  },
};
</script>

<style scoped>
.image-page {
  margin: 10px;
}
</style>
