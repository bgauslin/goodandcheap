<template lang="pug">
  li.preview
    router-link(:to="{ name: routeName, params: { slug: item.slug } }", :title="item.title")
      thumb(:image="item.photo", :title="item.title")
      div.summary
        h3 {{ item.title }}
        p.recipe-count(v-if="item.recipeCount") {{ item.recipeCount }} Recipes
</template>

<script>
import Thumb from './Thumb.vue'
export default {
  components: { Thumb },
  props: ['item', 'routeName']
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.preview
  position relative
  overflow hidden
  background white
  border-top 1px solid border-color
  list-style none

  a
    display flex
    flex-direction row
    align-items center

    &:link
      color dark-grey

    &:visited
      color medium-grey

    &:active
      color brand-color

      .chapter-title
        color brand-color

  .chapter-title
    body-font()
    small-caps(11)
    color light-grey

  h3
    heading-bold()
    line-height 1.1

  .summary
    flex-grow 1
    margin-left .5rem

  .recipe-count
  .tagline
  .kind
    display inline-block
    margin-top .2rem

  .count
    position absolute
    right 0
    bottom 1rem

    width 3rem
    text-align center

    line-height 1

.tagline
  display inline-block
  margin-right .4em
  body-font-bold()
  small-caps(11)

.no-touch
  .preview
    a
      &:hover
      &:visited:hover
        color brand-color

        .chapter-title
          color brand-color






.page-list
.chapter-list
  .preview
    a
      padding-right 1rem
    &:last-child
      border-bottom 1px solid border-color




.recipe-list
.favorites-list
  .preview
    &:last-child
      border-bottom 1px solid border-color

    a
      margin-right 3rem

    .favorite-toggle
    .remove-favorite
      top .5rem
      right 0




</style>
