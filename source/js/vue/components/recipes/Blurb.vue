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
import RecipeBlocks from './recipeBlocks/RecipeBlocks.vue';

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
@import '../../../../stylus/_config/'

.blurb p
  font_serif()
  margin 0 0 1em

.blurb a
  background '%s' % rgba(Branding.PRIMARY, .1)
  border-radius 2px
  padding .1em .4em

.no-touch .blurb a
  &:hover
    background '%s' % Branding.PRIMARY
    color white

</style>
