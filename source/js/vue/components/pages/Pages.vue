<template lang="pug">
  div.pages
    ol.previews
      preview(
        v-for="page in pages",
        :item="page",
        route-name="info"
      )
</template>

<script>
import Preview from '../partials/Preview.vue'

export default {
  components: { Preview },
  props: ['pages']
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.pages
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
