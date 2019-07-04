<template lang="pug">
  div.mini-recipe
    div.mini-recipe__content
      h4.mini-recipe__heading {{ miniRecipe.heading }}
      div.mini-recipe__blurb(
        v-html="miniRecipe.blurb",
      )
      checklist(
        :items="miniRecipe.ingredients",
      )
    figure.mini-recipe__photo(
      v-if="miniRecipe.photo",
    )
      img(
        :height="miniRecipe.photo.height",
        :src="miniRecipe.photo.src",
        :title="miniRecipe.photo.title",
        :width="miniRecipe.photo.width",
      )
</template>

<script>
import Checklist from './Checklist.vue';

export default {
  components: { Checklist },

  props: {
    miniRecipe: {
      blurb: String,
      photo: {
        height: Number,
        src: String,
        title: String,
        width: Number,
    }
  }
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.mini-recipe
  border-top 1px solid #eee
  display flex
  flex-direction row
  padding 1rem 0

.mini-recipe__content
  margin-right 1rem

.mini-recipe__heading
  margin 0 0 1em
  small_caps()
  typeface('sans_bold')

.mini-recipe__blurb p
  typeface('serif')
  margin 0 0 1em

.mini-recipe__photo
  flex-shrink 0
  margin-top 1.5rem
  width 5rem

  @media Breakpoint.SMALL
    width 8rem

</style>
