<template lang="pug">
  div.info
    ol.previews.previews--info
      preview(
        modifier="info",
        v-for="page in previews",
        :item="page",
        :key="page.slug",
        :to="{ name: 'info', params: { slug: page.slug } }",
      )
</template>

<script>
import Preview from './Preview.vue';

export default {
  components: { Preview },

  props: {
    previews: Array,
  }
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.info
  @media Breakpoint.MEDIUM
    margin 0 var(--margin)

  @media Breakpoint.XLARGE
    margin 0 auto
    width '%s' % ContentWidth.XLARGE

.previews--info
  @media Breakpoint.MEDIUM
    display grid
    grid-template-columns repeat(var(--columns), 1fr)

.preview--info
  margin -1px 0 0 -1px

@media Breakpoint.MEDIUM
  .preview__link--info
    border 1px solid var(--border-color)

</style>
