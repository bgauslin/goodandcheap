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

  h1
    serif-heavy()
    margin-bottom .5em

    @media(min-width breakpoint-large)
      font-size em(30)

  .blurb
    padding 1rem
    animation slideInUp .3s ease-out

    & > div
      serif()

    @media(min-width breakpoint-small)
      position-it(absolute, 0, 3rem, null, 3rem)
      padding 1.5rem
      box-shadow 0 0 5px 0 light-grey // horiz vert blur spread color
      background rgba(white, 0.95)
      animation slideInDown .3s ease-out

  .recipe-count
    margin 1rem 0 0
    sans-heavy()
    small-caps(11)

</style>
