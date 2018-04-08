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
  @media BREAKPOINT_MEDIUM
    margin 0 MARGINS_MEDIUM

  @media BREAKPOINT_LARGE
    margin 0 MARGINS_LARGE

  @media BREAKPOINT_XLARGE
    margin 0 auto
    width WIDTH_XLARGE

.chapters .previews
  @media BREAKPOINT_MEDIUM
    previews_grid()

.chapters .preview
  @media BREAKPOINT_MEDIUM
    preview_grid()

  @media BREAKPOINT_LARGE
    preview_grid_large()

</style>
