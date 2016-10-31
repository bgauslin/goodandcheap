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

.mini-recipe
  display flex
  flex-direction row
  padding 1rem
  border-top 1px solid #eee

  @media(min-width breakpoint-small)
    figure
      width 8rem

</style>
