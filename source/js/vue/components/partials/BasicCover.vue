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
@import '../../../../stylus/_config/'

.cover
  cover()

  h1
    margin-bottom .5em
    serif_heavy()

    @media(min-width BREAKPOINT_LARGE)
      font-size px_to_em(30)

  .blurb
    animation fadeIn .3s ease-out
    padding 1rem

    & > div
      serif()

    @media(min-width BREAKPOINT_SMALL)
      background rgba(WHITE, 0.95)
      box-shadow 0 0 5px 0 LIGHT_GREY
      padding 1.5rem
      position_it(absolute, 0, 3rem, null, 3rem)

  .recipe-count
    margin 1rem 0 0
    sans_heavy()
    small_caps()

</style>
