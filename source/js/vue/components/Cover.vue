<template lang="pug">
  div(
    :class="['cover', 'cover--' + modifier]"
  )
    cover-photo(
      :image="image",
      :title="title",
    )
    budget(
      v-if="budget",
      :budget="budget",
    )
    div.cover__content(
      v-if="displayTitle === 'yes'",
    )
      h1.cover__title {{ title }}
      div.cover__blurb(
        v-html="blurb",
      )
      p.recipe-count.recipe-count--cover(
        v-if="count",
      ) {{ count }}
</template>

<script>
import Budget from './Budget.vue';
import CoverPhoto from './CoverPhoto.vue';
import imagesLoaded from 'imagesloaded';

export default {
  components: {
    Budget,
    CoverPhoto,
  },

  props: {
    blurb: String,
    budget: Object,
    count: String,
    displayTitle: String,
    image: Object,
    modifier: String,
    title: String,
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.cover
  overflow hidden
  position relative

.cover__content
  animation fadeIn .3s ease-out
  padding 1rem

  @media Breakpoint.SMALL
    background rgba(white, .95)
    box-shadow 0 0 5px 0 var(--light-grey)
    padding 1.5rem
    position_it(absolute, 0, 3rem, null, 3rem)

.cover__title
  margin-bottom .5em
  typeface('serif_bold')

  @media Breakpoint.LARGE
    font-size px_to_em(30)

.cover__blurb
  typeface('serif')

.recipe-count--cover
  margin 1rem 0 0

@media Breakpoint.LARGE
  .cover--recipe
    position_it(absolute, 0, 0, null, null)
    width 50%

</style>