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
@import '../../../../../stylus/config/'

.mini-recipe
  display flex
  flex-direction row
  padding 1rem 0
  border-top 1px solid #eee

  .contents
    margin-right 1rem

  h4
    margin 0 0 1em
    sans-heavy()
    small-caps()
  p
    margin 0 0 1em
    serif()

  figure
    margin-top 1.5rem
    width 5rem
    flex-shrink 0

    @media(min-width breakpoint-small)
      width 8rem

</style>
