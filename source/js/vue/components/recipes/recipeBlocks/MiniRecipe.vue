<template lang="pug">
  div.mini-recipe
    div.contents
      h4 {{ miniRecipe.heading }}
      div(v-html="miniRecipe.blurb")
      checklist(:items="miniRecipe.ingredients")
    figure(v-if="miniRecipe.photo")
      img(
        :src="miniRecipe.photo.src",
        :width="miniRecipe.photo.width",
        :height="miniRecipe.photo.height",
        :title="miniRecipe.photo.title"
      )
</template>

<script>
import Checklist from '../Checklist.vue'
export default {
  components: { Checklist },
  props: ['miniRecipe']
}
</script>

<style lang="stylus">
@import '../../../../../stylus/_config/'

.mini-recipe
  border-top 1px solid #eee
  display flex
  flex-direction row
  padding 1rem 0

  .contents
    margin-right 1rem

  h4
    margin 0 0 1em
    font_sans_heavy()
    small_caps()
  p
    margin 0 0 1em
    font_serif()

  figure
    flex-shrink 0
    margin-top 1.5rem
    width 5rem

    @media(min-width BREAKPOINT_SMALL)
      width 8rem

</style>
