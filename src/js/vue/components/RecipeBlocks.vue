<template lang="pug">
  div.recipe__blocks
    template(
      v-for="block in content",
    )
      variation(
        v-if="block.type === 'variation'",
        :variation="block",
      )
      linked-recipe(
        v-if="block.type === 'linkedRecipe'",
        :linkedRecipe="block",
      )
      mini-recipe(
        v-if="block.type === 'miniRecipe'",
        :miniRecipe="block",
        :parentId="parentId",
      )
</template>

<script>
import LinkedRecipe from './LinkedRecipe.vue';
import MiniRecipe from './MiniRecipe.vue';
import Variation from './Variation.vue';

export default {
  components: {
    LinkedRecipe,
    MiniRecipe,
    Variation,
  },

  props: {
    content: Array,
    parentId: Number,
  },
}
</script>
