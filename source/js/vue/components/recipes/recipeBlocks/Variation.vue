<template lang="pug">
  div.variation
    img(
      :src="variation.photo.src",
      :width="variation.photo.width",
      :height="variation.photo.height",
      :alt="variation.photo.title"
    )
    h4 {{ variation.heading }}
</template>

<script>
export default {
  props: ['variation']
}
</script>

<style lang="stylus">
@import '../../../../../stylus/_config/'

.variation
  h4
    sans_heavy()
    small_caps()

</style>
