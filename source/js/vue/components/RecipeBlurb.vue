<template lang="pug">
  div
    div.blurb(
      v-if="blurb",
      v-html="blurb",
    )
    copy-blocks(
      v-if="copyBlocks",
      :data="copyBlocks",
    )
    recipe-blocks(
      v-if="recipeBlocks",
      :data="recipeBlocks",
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

  props: [
    'blurb',
    'copyBlocks',
    'recipeBlocks',
  ],
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.blurb p
  typeface('serif')
  margin 0 0 1em

.blurb a
  background rgba(LINK_COLOR, .1)
  border-radius 2px
  padding .1em .4em

.no-touch .blurb a:hover
  background var(--link)
  color white

</style>
