<template lang="pug">
  div.variation
    img(
      :alt="variation.photo.title",
      :height="variation.photo.height",
      :src="variation.photo.src",
      :width="variation.photo.width",
    )
    h4 {{ variation.heading }}
</template>

<script>
export default {
  props: ['variation'],
}
</script>

<style lang="stylus">
@import '../../../../../stylus/_config/'

.variation
  h4
    font_sans_heavy()
    small_caps()

</style>
