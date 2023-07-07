<template>
  <tr class="image-list-view" v-if="image">
    <td>{{ index }}</td>
    <td>{{ image.name }}</td>
    <td>{{ image.fileSize }}</td>

    <td><v-img :src="image.imageURL" width="200px"></v-img></td>
    <td>{{ image.createdAt }}</td>
    <!-- <td>
      <advertiser-update-form
        @advertiserUpdate="onClickAdvertiserUpdate"
        :advertiser="advertiser"
      />
    </td> -->
    <!-- <td>
      <advertiser-delete-form
        @advertiserDelete="onClickAdvertiserDelete"
        :advertiser="advertiser"
      />
    </td> -->
  </tr>
</template>

<script>
// import AdvertiserUpdateForm from "./AdvertiserUpdateForm";
// import AdvertiserDeleteForm from "./AdvertiserDeleteForm";
import { mapActions } from "vuex";

export default {
  name: "AdvertiserView",
  props: {
    image: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },
  components: {
    // AdvertiserUpdateForm,
    // AdvertiserDeleteForm,
  },
  methods: {
    // async onClickAdvertiserUpdate(payload) {
    //   await this.updateAdvertiser(payload);
    //   await this.getAdvertisers();
    // },
    // async onClickAdvertiserDelete(id) {
    //   await this.deleteAdvertiser(id);
    //   await this.getAdvertisers();
    // },
    ...mapActions(["updateAdvertiser", "deleteAdvertiser", "getAdvertisers"]),
  },
};
</script>
