<template lang="pug">
  div.cover-photo
    figure(
      v-if="loading",
      :style="'background-image:url(' + image.placeholder + ')'"
    )
    figure(
      v-if="!loading",
      :style="'background-image:url(' + image.placeholder + ')'"
    )
      img(
        :src="image.src",
        :width="image.width",
        :height="image.height",
        :alt="title",
        class="hi-res"
      )
</template>

<script>
import imagesLoaded from 'imagesloaded'

export default {
  props: ['image', 'title'],

  data () {
    return {
      loading: null
    }
  },

  mounted () {
    this.loadImages()
  },

  methods: {
    loadImages () {
      this.loading = true
      let that = this
      imagesLoaded(this.$el.querySelector('.hi-res'), that, function(instance) {
        that.loading = false
      })
    }
  }
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.cover-photo
  figure
    background-position center center
    background-repeat no-repeat
    background-size cover

  img
    animation fade-in 1s ease

</style>
