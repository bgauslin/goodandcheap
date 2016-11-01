<template lang="pug">
  div.recipe-cover
    figure(:style="'background-image:url(' + image.placeholder + ')'")
      img(
        v-if="!loading",
        :src="image.src",
        :width="image.width",
        :height="image.height",
        :alt="title"
      )
    budget(:budget="budget")
</template>

<script>
import Budget from './Budget.vue'
import imagesLoaded from 'imagesloaded'

export default {
  components: { Budget },
  props: ['image', 'title', 'budget'],

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

.recipe-cover
  position relative // NOTE for .budget position
  cover()

  figure
    background-position center center
    background-repeat no-repeat
    background-size cover

    img
      animation fadeIn 1s ease

</style>
