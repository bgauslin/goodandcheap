<template lang="pug">
  div.cover
    img(
      :src="image.src",
      :width="image.width",
      :height="image.height",
      :alt="title"
    )
    div.blurb
      h1 {{ title }}
      div(v-html="blurb")
      p.recipe-count(v-if="count") {{ count }}
</template>

<script>
export default {
  props: ['image', 'title', 'blurb', 'count']
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.cover
  cover()

  @media(min-width breakpoint-small)
    cover-small()

  .recipe-count
    margin 1rem 0 0
    sans-heavy()
    small-caps(11)

</style>
