<template lang="pug">
  div.cover
    cover-photo(
      :image="image",
      :title="title",
    )
    div.cover__content
      h1.cover__title {{ title }}
      div.cover__blurb(
        v-html="blurb",
      )
      p.cover__recipe-count(
        v-if="count",
      ) {{ count }}
</template>

<script>
import CoverPhoto from './CoverPhoto.vue';
import imagesLoaded from 'imagesloaded';

export default {
  components: { CoverPhoto },

  props: [
    'blurb',
    'count',
    'image',
    'title',
  ],
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.cover
  cover()

.cover img
  animation fadeIn .3s ease-out

.cover__content
  animation fadeIn .3s ease-out
  padding 1rem

  @media Breakpoint.SMALL
    background rgba(white, .95)
    box-shadow 0 0 5px 0 '%s' % Color.LIGHT_GREY
    padding 1.5rem
    position_it(absolute, 0, 3rem, null, 3rem)

.cover__title
  margin-bottom .5em
  typeface('serif_bold')

  @media Breakpoint.LARGE
    font-size px_to_em(30)

.cover__blurb
  font_serif()

.cover__recipe-count
  margin 1rem 0 0
  small_caps()
  typeface('sans_bold')

</style>
