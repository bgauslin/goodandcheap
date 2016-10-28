<template lang="pug">
  div.cover
    img(
      :src="image.src",
      :width="image.width",
      :height="image.height",
      :alt="title")
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
  position relative
  background white

  @media(min-width breakpoint-small)
    overflow hidden

    .blurb
      position absolute
      top 0
      left 3rem
      right 3rem
      padding 1.5rem
      box-shadow 0 0 5px 0 light-grey // horiz vert blur spread color
      background rgba(white, 0.95)

  @media(min-width breakpoint-large)
    background transparent

  figure
    width 100%

  h1
    margin-bottom .5em

    @media(min-width breakpoint-large)
      font-size em(30)

  .budget
    position absolute
    top 3em
    right 0
    padding .5em 2em .5em 1em
    background rgba(white, 0.97)

</style>
