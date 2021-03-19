<template lang="pug">
  .mini-recipe
    h4.mini-recipe__heading {{ miniRecipe.heading }}
    figure.mini-recipe__photo(
      v-if="miniRecipe.photo"
    )
      img(
        :height="miniRecipe.photo.height"
        :src="miniRecipe.photo.src"
        :title="miniRecipe.photo.title"
        :width="miniRecipe.photo.width"
      )
    .mini-recipe__blurb(
      v-html="miniRecipe.blurb"
    )
    checklist.mini-recipe__checklist(
      :items="miniRecipe.ingredients"
      :listIndex="miniRecipe.id"
      :parentId="parentId"
    )
</template>

<script>
import Checklist from './Checklist.vue';

export default {
  components: { Checklist },

  props: {
    miniRecipe: {
      blurb: String,
      id: Number,
      photo: {
        height: Number,
        src: String,
        title: String,
        width: Number,
      }
    },
    parentId: Number,
  }
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.mini-recipe
  --photo-width 5rem

  @media breakpoint.small
    --photo-width 8rem

.mini-recipe
  border-top 1px solid var(--border-color)
  align-content start
  display grid
  grid-gap 0 1rem
  grid-template-columns 1fr var(--photo-width)
  padding 1rem 0

.mini-recipe__heading
.mini-recipe__checklist
  grid-column 1/3

.mini-recipe__heading
  small_caps()
  typeface('sans_bold')
  margin 0 0 1em

.mini-recipe__blurb p
  typeface('serif')
  grid-column 1
  grid-row 2
  margin 0 0 1em

.mini-recipe__photo
  grid-column 2
  grid-row 2

</style>
