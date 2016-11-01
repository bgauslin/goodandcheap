<template lang="pug">
  div.cover
    figure(:style="'background-image:url(' + image.placeholder + ')'")
      img(
        v-if="loaded",
        :src="image.src",
        :width="image.width",
        :height="image.height",
        :alt="title"
      )
    div.blurb
      h1 {{ title }}
      div(v-html="blurb")
      p.recipe-count(v-if="count") {{ count }}
</template>

<script>
import imagesLoaded from 'imagesloaded'

export default {
  props: ['image', 'title', 'blurb', 'count'],

  data () {
    return {
      loaded: null
    }
  },

  mounted () {
    this.loadImages()
  },

  methods: {
    loadImages () {
      this.loaded = false
      let self = this
      imagesLoaded(this.$el.querySelectorAll('img'), self, function(instance) {
        self.loaded = true
      })
    }
  }
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.cover
  position relative
  cover()

  figure
    background-position center center
    background-repeat no-repeat
    background-size cover

    img
      animation fadeIn 1s ease


  h1
    serif-heavy()
    margin-bottom .5em

    @media(min-width breakpoint-large)
      font-size em(30)

  .blurb
    padding 1rem
    animation fadeIn .5s ease-out

    & > div
      serif()

    @media(min-width breakpoint-small)
      position-it(absolute, 0, 3rem, null, 3rem)
      padding 1.5rem
      box-shadow 0 0 5px 0 light-grey // horiz vert blur spread color
      background rgba(white, 0.95)

  .recipe-count
    margin 1rem 0 0
    sans-heavy()
    small-caps(11)

</style>
