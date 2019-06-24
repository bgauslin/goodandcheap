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
import Preview from './Preview.vue';

export default {
  components: { Preview },
  props: ['chapters'],
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.chapters
  @media Breakpoint.MEDIUM
    margin 0 var(--margin)

  @media Breakpoint.XLARGE
    margin 0 auto
    width '%s' % ContentWidth.XLARGE

// TODO: BEM-ify selectors.
.chapters .previews
  @media Breakpoint.MEDIUM
    previews_grid()

.chapters .preview
  margin -1px 0 0 -1px

  @media Breakpoint.MEDIUM
    preview_width()

  @media Breakpoint.LARGE
    preview_width('large')

@media Breakpoint.MEDIUM
  .chapters .preview a
    border 1px solid var(--border-color)

</style>
