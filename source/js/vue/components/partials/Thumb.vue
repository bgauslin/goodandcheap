<template lang="pug">
  figure.thumb
    img(
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

  data () {
    return {
      loading: null,
    }
  },

  mounted () {
    this.loadImages();
  },

  methods: {
    loadImages () {
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
@import '../../../../stylus/_config/'

.thumb
  background-color LIGHTER_GREY
  border-radius .25em
  flex-shrink 0
  height 5rem
  margin .5rem
  width 5rem

  img
    animation fadeIn .3s ease-out
    border-radius .25em

</style>
