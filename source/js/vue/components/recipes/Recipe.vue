<template lang="pug">
  article.recipe
    section.cover
      <!-- _coverPhoto -->
      budget(:budget="budget")
    section.overview
      header
        h1 {{ recipe.title }}
        h2.tagline {{ recipe.tagline }}
        p.new(v-if="recipe.badge") New
      div
        div.blurb.list#intro
          h3 Intro
          div v-html="recipe.blurb"
        ingredients(:ingredients="recipe.ingredients")
        instructions(:instructions="recipe.instructions")
</template>

<script>
import Badge from './Badge.vue'
import Budget from './Budget.vue'
import Ingredients from './Ingredients.vue'
import Instructions from './Instructions.vue'

export default {
  components: {Badge, Budget, Ingredients, Instructions },
  props: ['recipe']
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.recipe
  header
    margin 0 3rem 1rem 1rem
    padding-top 1rem

    .kind
      margin-bottom .5rem

  .tabs
    margin 0 1rem 1rem
    width calc(100% - 2rem)

  h3
    margin 0 0 1em
    body-font-bold()
    small-caps(11)

  .overview
    position relative
    background white

  .blurb
    padding-top 0

  .favorite-toggle
    top .75rem
    right 0

  h4
    margin 0 0 1em

</style>
