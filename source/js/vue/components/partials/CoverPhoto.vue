<template lang="pug">
  figure.cover-photo(
    :style="'background: url(' + image.placeholder + ') center center / cover no-repeat'",
  )
    img.cover-photo__image(
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
  props: [
    'image',
    'title',
  ],

  data() {
    return {
      loading: null,
    }
  },

  mounted() {
    this.loadImages();
  },

  methods: {
    /** @description ... */
    loadImages() {
      this.loading = true;
      let that = this;
      imagesLoaded(this.$el.querySelector('.cover-photo__image'), that, instance => {
        that.loading = false;
      });
    },
  },
}
</script>

<style lang="stylus">
@import '../../../../stylus/_config/'

.cover-photo__image
  animation fadeIn 1s ease-out

</style>
