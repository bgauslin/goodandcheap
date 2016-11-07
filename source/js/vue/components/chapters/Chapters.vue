<template lang="pug">
  div.chapters
    ol.previews
      preview(
        v-for="chapter in chapters",
        :item="chapter",
        route-name="chapter"
      )
</template>

<script>
import Preview from '../partials/Preview.vue'
export default {
  components: { Preview },
  props: ['chapters']
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.chapters
  @media(min-width breakpoint-medium)
    margin 0 margins-medium

  @media(min-width breakpoint-large)
    margin 0 margins-large

  @media(min-width breakpoint-xlarge)
    margin 0 auto
    width width-xlarge

  .previews
    @media(min-width breakpoint-medium)
      previews-grid()

  .preview
    @media(min-width breakpoint-medium)
      preview-grid()

    @media(min-width breakpoint-large)
      preview-grid-large()

</style>
