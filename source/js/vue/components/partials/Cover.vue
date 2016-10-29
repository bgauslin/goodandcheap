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
  background white

  h1
    serif-heavy()
    margin-bottom .5em

    @media(min-width breakpoint-large)
      font-size em(30)

  .blurb
    serif()

  .budget
    position-it(absolute, 3em, 0, null, null)
    padding .5em 2em .5em 1em
    background rgba(white, 0.97)

  @media(min-width breakpoint-small)
    aspect-ratio(1, 1)
    overflow hidden

    .blurb
      position-it(absolute, 0, 3rem, null, 3rem)
      padding 1.5rem
      box-shadow 0 0 5px 0 light-grey // horiz vert blur spread color
      background rgba(white, 0.95)

</style>
