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
  @media Breakpoint.MEDIUM
    margin '0 %s' % Layout.Margin.MEDIUM

  @media Breakpoint.LARGE
    margin '0 %s' % Layout.Margin.LARGE

  @media Breakpoint.XLARGE
    margin 0 auto
    width WIDTH_XLARGE

.pages .previews
  @media Breakpoint.MEDIUM
    previews_grid()

.pages .preview
  @media Breakpoint.MEDIUM
    preview_grid()

  @media Breakpoint.LARGE
    preview_grid_large()

</style>
