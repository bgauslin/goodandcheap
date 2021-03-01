<template lang="pug">
  div.recipe__intro
    div.blurb(
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

.blurb p
  typeface('serif')
  margin 0 0 1em

.blurb a
  background rgba(link-color, .1)
  border-radius 2px
  padding .1em .4em

[no-touch] .blurb a:hover
  background var(--link-color)
  color white

</style>
