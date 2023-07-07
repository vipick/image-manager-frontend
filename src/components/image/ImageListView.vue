<template>
  <tr class="image-list-view" v-if="image">
    <td>{{ index }}</td>
    <td>{{ image.name }}</td>
    <td>{{ image.fileSize }} ({{ (image.fileSize / 1000000).toFixed(1) }}MB)</td>
    <td><v-img :src="image.imageURL" width="100px"></v-img></td>
    <td>{{ image.createdAt }}</td>
    <td>
      <image-delete-form @imageDelete="onClickImageDelete" :image="image" />
    </td>
  </tr>
</template>

<script>
import ImageDeleteForm from "./ImageDeleteForm";
import { mapActions } from "vuex";

export default {
  name: "ImageListView",
  props: {
    image: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },
  components: {
    ImageDeleteForm,
  },
  methods: {
    async onClickImageDelete(id) {
      await this.deleteImage(id);
      await this.getImages();
    },
    ...mapActions(["deleteImage", "getImages"]),
  },
};
</script>
