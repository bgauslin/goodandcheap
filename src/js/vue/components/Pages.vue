<template lang="pug">
  div.info
    ol.previews.previews--info
      preview(
        v-for="page in previews",
        modifier="info",
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
  @media breakpoint.medium
    margin 0 var(--margin)

  @media breakpoint.xlarge
    margin 0 auto
    width content-width-xlarge

.previews--info
  @media breakpoint.medium
    display grid
    grid-template-columns repeat(var(--columns), 1fr)

.preview--info
  margin -1px 0 0 -1px

@media breakpoint.medium
  .preview__link--info
    border 1px solid var(--border-color)

</style>
