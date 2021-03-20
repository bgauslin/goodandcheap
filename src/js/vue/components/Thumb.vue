<template lang="pug">
  figure.thumb
    img.thumb__image(
      v-if="!loading"
      :alt="title"
      :height="image.height"
      :src="image.src"
      :width="image.width"
    )
</template>

<script>
import imagesLoaded from 'imagesloaded';

export default {
  props: {
    image: {
      height: Number,
      src: String,
      width: Number,
    },
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
    /** Toggles loading flag after an image has fully downloaded. */
    loadImages() {
      this.loading = true;
      let that = this;
      imagesLoaded(this.$el, that, instance => {
        that.loading = false;
      });
    },
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.thumb
  background-color var(--background-1)
  flex 0 0 thumb-size
  height thumb-size
  margin .5rem

.thumb__image
  animation fadeIn .3s ease-out
  border-radius 4px

</style>
