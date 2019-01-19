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
import Preview from '../partials/Preview.vue';

export default {
  components: { Preview },
  props: ['chapters'],
}
</script>

<style lang="stylus">
@import '../../../../stylus/_config/'

.chapters
  @media Breakpoint.MEDIUM
    margin '0 %s' % Layout.Margin.MEDIUM

  @media Breakpoint.LARGE
    margin '0 %s' % Layout.Margin.LARGE

  @media Breakpoint.XLARGE
    margin 0 auto
    width WIDTH_XLARGE

.chapters .previews
  @media Breakpoint.MEDIUM
    previews_grid()

.chapters .preview
  @media Breakpoint.MEDIUM
    preview_grid()

  @media Breakpoint.LARGE
    preview_grid_large()

</style>
