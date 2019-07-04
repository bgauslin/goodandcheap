<template lang="pug">
  figure.cover__photo(
    :style="'background: url(' + image.placeholder + ') center center / cover no-repeat'",
  )
    img.cover__image(
      v-if="!loading",
      :alt="title",
      :height="image.height",
      :src="image.src",
      :width="image.width",
    )
</template>

<script>
import imagesLoaded from 'imagesloaded';

export default {
  props: {
    image: Object,
    title: String,
  },

  data() {
    return {
      loading: null,
    }
  },

  mounted() {
    this.loadImages();
  },

  methods: {
    /** 
     * @description Toggles loading flag after an image has fully downloaded.
     */
    loadImages() {
      this.loading = true;
      let that = this;
      imagesLoaded(this.$el.querySelector('.cover__image'), that, instance => {
        that.loading = false;
      });
    },
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.cover__image
  animation fadeIn 1s ease-out

</style>
