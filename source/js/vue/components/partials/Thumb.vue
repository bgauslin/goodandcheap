<template lang="pug">
  figure.thumb
    img(
      :src="image.src",
      :width="image.width",
      :height="image.height",
      :alt="title"
    )
</template>

<script>
export default {
  props: ['image', 'title']
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.thumb
  flex-shrink 0
  margin .5rem
  width 5rem

</style>
