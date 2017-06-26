<template lang="pug">
  div.cover
    cover-photo(:image="image", :title="title")
    div.blurb
      h1 {{ title }}
      div(v-html="blurb")
      p.recipe-count(v-if="count") {{ count }}
</template>

<script>
import CoverPhoto from './CoverPhoto.vue'
import imagesLoaded from 'imagesloaded'

export default {
  components: { CoverPhoto },
  props: ['blurb', 'count', 'image', 'title']
}
</script>

<style lang="stylus">
@import '../../../../stylus/_config/'

.cover
  cover()

  h1
    font_serif_heavy()
    margin-bottom .5em

    @media(min-width BREAKPOINT_LARGE)
      font-size px_to_em(30)

  .blurb
    animation fadeIn .3s ease-out
    padding 1rem

    & > div
      font_serif()

    @media(min-width BREAKPOINT_SMALL)
      background rgba(WHITE, 0.95)
      box-shadow 0 0 5px 0 LIGHT_GREY
      padding 1.5rem
      position_it(absolute, 0, 3rem, null, 3rem)

  .recipe-count
    font_sans_heavy()
    margin 1rem 0 0
    small_caps()

</style>
