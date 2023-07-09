<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <template v-slot:activator="{ on }">
        <v-row justify="center" align="center">
          <v-btn outlined large v-on="on">이미지 추가</v-btn>
        </v-row>
      </template>
      <v-card>
        <v-form ref="form">
          <v-card-text>
            <v-container>
              <v-row justify="center" align="center">
                <v-col cols="12" sm="12" md="12">
                  <v-file-input
                    v-model="img"
                    accept="image/*"
                    label="이미지 선택"
                    @change="onClickGetImage"
                  ></v-file-input>
                  <v-img :src="imageURL" width="100px"></v-img>
                  <v-text v-if="imageURL"
                    >{{ name }} ({{ (fileSize / 1000000).toFixed(1) }} MB)
                  </v-text>
                </v-col>
              </v-row>

              <v-row justify="center" align="center">
                <v-spacer></v-spacer>
                <v-btn
                  outlined
                  text
                  @click="
                    (dialog = false), (name = ''), (imageURL = ''), (fileSize = ''), (img = '')
                  "
                  >취소</v-btn
                >
                <v-btn outlined @click="onClickAddImage">저장</v-btn>
              </v-row>
              <br />
            </v-container>
          </v-card-text>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ImageAddForm",
  data() {
    return {
      img: "",
      name: "",
      imageURL: "",
      fileSize: "",
      dialog: false,
    };
  },

  methods: {
    //onChange 로 imgUrl를 얻는다.
    async onClickGetImage() {
      const res = await this.uploadImage(this);
      this.imageURL = res.data.data.imageURL;
      this.name = res.data.data.name;
      this.fileSize = res.data.data.fileSize;
    },

    onClickAddImage() {
      this.dialog = false;

      this.$emit("addImage", this);
      this.name = "";
      this.imageURL = "";
      this.fileSize = "";
      this.img = "";
    },
    ...mapActions(["uploadImage"]),
  },
};
</script>
