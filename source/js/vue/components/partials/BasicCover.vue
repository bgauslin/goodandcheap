<template lang="pug">
  div.cover
    cover-photo(:image="image", :title="title")
    div.blurb
      h1 {{ title }}
      div(v-html="blurb")
      p.recipe-count(v-if="count") {{ count }}
</template>

<script>
import imagesLoaded from 'imagesloaded'
import CoverPhoto from './CoverPhoto.vue'

export default {
  components: { CoverPhoto },
  props: ['image', 'title', 'blurb', 'count']
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.cover
  cover()

  h1
    serif-heavy()
    margin-bottom .5em

    @media(min-width breakpoint-large)
      font-size em(30)

  .blurb
    padding 1rem
    animation fadeIn .3s ease-out
    //animation slideInUp .3s ease-out

    & > div
      serif()

    @media(min-width breakpoint-small)
      position-it(absolute, 0, 3rem, null, 3rem)
      padding 1.5rem
      box-shadow 0 0 5px 0 light-grey // horiz vert blur spread color
      background rgba(white, 0.95)
      //animation slideInDown .3s ease-out

  .recipe-count
    margin 1rem 0 0
    sans-heavy()
    small-caps()

</style>
