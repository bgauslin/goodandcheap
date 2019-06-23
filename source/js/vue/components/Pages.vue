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
import Preview from './Preview.vue';

export default {
  components: { Preview },
  props: ['pages'],
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.pages
  @media Breakpoint.MEDIUM
    margin 0 var(--margin)

  @media Breakpoint.XLARGE
    margin 0 auto
    width '%s' % ElementWidth.XLARGE

.pages .previews
  @media Breakpoint.MEDIUM
    previews_grid()

.pages .preview
  margin -1px 0 0 -1px

  @media Breakpoint.MEDIUM
    preview_width()

  @media Breakpoint.LARGE
    preview_width('large')

</style>
