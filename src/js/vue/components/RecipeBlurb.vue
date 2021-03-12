<template lang="pug">
  .intro
    .blurb(
      v-if="content.blurb",
      v-html="content.blurb",
    )
    copy-blocks(
      v-if="content.copyBlocks",
      :content="content.copyBlocks",
    )
    recipe-blocks(
      v-if="content.recipeBlocks",
      :content="content.recipeBlocks",
      :parentId="parentId",
    )
</template>

<script>
import CopyBlocks from './CopyBlocks.vue';
import RecipeBlocks from './RecipeBlocks.vue';

export default {
  components: {
    CopyBlocks,
    RecipeBlocks,
  },

  props: {
    content: {
      blurb: String,
      copyBlocks: Array,
      recipeBlocks: Array,
    },
    parentId: Number,
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.intro
  margin 1rem 0 0

.blurb p
  typeface('serif')
  margin 0 0 1em

.blurb a
  typeface('serif_bold')

</style>
