<template lang="pug">
  figure.thumb
    img(
      v-if="!loading",
      :src="image.src",
      :width="image.width",
      :height="image.height",
      :alt="title"
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
      let self = this
      imagesLoaded(this.$el, self, function(instance) {
        self.loading = false
      })
    }
  }
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.thumb
  flex-shrink 0
  margin .5rem
  width 5rem
  height 5rem
  border-radius .25em
  background-color lighter-grey

  img
    border-radius .25em
    animation fadeIn .3s ease-out

</style>
