<template lang="pug">
  div.variation
    img(
      :alt="variation.photo.title",
      :height="variation.photo.height",
      :src="variation.photo.src",
      :width="variation.photo.width",
    )
    h4.variation__heading {{ variation.heading }}
</template>

<script>
export default {
  props: ['variation'],
}
</script>

<style lang="stylus">
@import '../../../../../stylus/config/'

.variation__heading
  small_caps()
  typeface('sans_bold')

</style>
