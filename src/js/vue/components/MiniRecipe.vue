<template lang="pug">
  .mini-recipe
    .mini-recipe__content
      h4.mini-recipe__heading {{ miniRecipe.heading }}
      .mini-recipe__blurb(
        v-html="miniRecipe.blurb"
      )
      checklist(
        :items="miniRecipe.ingredients"
        :listIndex="miniRecipe.id"
        :parentId="parentId"
      )
    figure.mini-recipe__photo(
      v-if="miniRecipe.photo"
    )
      img(
        :height="miniRecipe.photo.height"
        :src="miniRecipe.photo.src"
        :title="miniRecipe.photo.title"
        :width="miniRecipe.photo.width"
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
  border-top 1px solid var(--border-color)
  display flex
  padding 1rem 0

.mini-recipe__content
  margin-right 1rem

.mini-recipe__heading
  small_caps()
  typeface('sans_bold')
  margin 0 0 1em

.mini-recipe__blurb p
  typeface('serif')
  margin 0 0 1em

.mini-recipe__photo
  flex-shrink 0
  margin-top 1.5rem
  width 5rem

  @media breakpoint.small
    width 8rem

</style>
