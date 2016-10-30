<template lang="pug">
  div
    <!-- variation(v-if="block.type === 'variation'", :variation="block.variation") -->
    linked-recipe(
      v-if="block.type === 'linkedRecipe'",
      :linkedRecipe="block"
    )
    <!-- mini-recipe(v-if="block.type === 'miniRecipe'",:miniRecipe="block.miniRecipe") -->
</template>

<script>
import Variation from './Variation.vue'
import LinkedRecipe from './LinkedRecipe.vue'
import MiniRecipe from './MiniRecipe.vue'

export default {
  props: ['block'],

  components: { Variation, LinkedRecipe, MiniRecipe}
}
</script>

<style lang="stylus">

.linked-recipe
  margin 0 0 1rem
  padding 0 1rem 1rem

</style>
