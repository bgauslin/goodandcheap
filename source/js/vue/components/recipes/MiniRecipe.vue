<template lang="pug">
  div.mini-recipe
    div.contents
      h4 {{ miniRecipe.heading }}
      div(v-html="miniRecipe.blurb")
      ol.ingredients
        li(v-for="ingredient in miniRecipe.ingredients") {{ ingredient }}
    figure(v-if="miniRecipe.photo")
      img(
        :src="miniRecipe.photo.src",
        :width="miniRecipe.photo.width",
        :height="miniRecipe.photo.height",
        :title="miniRecipe.photo.title"
      )
</template>

<script>
import Ingredients from './Ingredients.vue'
export default {
  components: { Ingredients },
  props: ['miniRecipe']
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

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
    small-caps(11)
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
