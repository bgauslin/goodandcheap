<template lang="pug">
  .info
    ol.previews.previews--info
      preview(
        v-for="page in previews"
        modifier="info"
        :item="page"
        :key="page.slug"
        :to="{ name: 'info', params: { slug: page.slug } }"
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
  margin 0 auto
  max-width content-max-width

.previews--info
  @extends $previews-grid

.preview.preview--info
  border 0

</style>
