<template lang="pug">
  div.pages
    ol.previews
      preview(
        v-for="page in pages",
        :item="page",
        route-name="info",
      )
</template>

<script>
import Preview from '../partials/Preview.vue';

export default {
  components: { Preview },
  props: ['pages'],
}
</script>

<style lang="stylus">
@import '../../../../stylus/_config/'

.pages
  @media BREAKPOINT_MEDIUM
    margin 0 MARGINS_MEDIUM

  @media BREAKPOINT_LARGE
    margin 0 MARGINS_LARGE

  @media BREAKPOINT_XLARGE
    margin 0 auto
    width WIDTH_XLARGE

.pages .previews
  @media BREAKPOINT_MEDIUM
    previews_grid()

.pages .preview
  @media BREAKPOINT_MEDIUM
    preview_grid()

  @media BREAKPOINT_LARGE
    preview_grid_large()

</style>
