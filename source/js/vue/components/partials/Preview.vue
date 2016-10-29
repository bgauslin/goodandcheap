<template lang="pug">
  li.preview
    router-link(:to="{ name: routeName, params: { slug: item.slug } }", :title="item.title")
      thumb(:image="item.thumb", :title="item.title")
      div.summary
        p.chapter-title(v-if="item.chapter && showChapter") {{ item.chapter }}
        h3 {{ item.title }}
        p.tagline(v-if="item.tagline") {{ item.tagline }}
        badge(v-if="item.new", label="New")
        p.kind(v-if="item.kind == 'ideas' || item.kind == 'method'", :class="item.kind|lower") {{ recipe.kind }}
        p.recipe-count(v-if="item.recipeCount") {{ item.recipeCount }} Recipes
        p.index(v-if="showCount") {{ itemCount }}
    toggle-favorite(v-if="toggleFavorite", :id="item.id")
    remove-favorite(v-if="removeFavorite", :id="item.id")
</template>


<script>
import Thumb from './Thumb.vue'
import Badge from '../recipes/Badge.vue'
import ToggleFavorite from '../favorites/ToggleFavorite.vue'
import RemoveFavorite from '../favorites/RemoveFavorite.vue'

export default {
  components: { Thumb, Badge, ToggleFavorite, RemoveFavorite },

  props: ['item', 'routeName', 'showChapter', 'showCount', 'index', 'toggleFavorite', 'removeFavorite'],

  computed: {
    itemCount () {
      return this.index + 1
    }
  }
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.preview
  position relative
  list-style none

  a
    display flex
    flex-direction row
    align-items center
    background white
    border-top 1px solid border-color
    link(dark-grey, medium-grey, brand-color)

    .chapter-title
      //color brand-color

  &:last-child
    a
      border-bottom 1px solid border-color

  &.recipe-preview
    a
      margin-right 3rem

  .toggle-favorite
  .remove-favorite
    top .5rem
    right 0

  .chapter-title
    sans()
    small-caps(11)
    //color light-grey

  h3
    serif-heavy()
    line-height 1.1

  .summary
    flex-grow 1
    margin-left .5rem

  .recipe-count
    sans-heavy()
    small-caps(11)

  .recipe-count
  .tagline
  .kind
    display inline-block
    margin-top .2rem

  .index
    position absolute
    right 0
    bottom 1rem
    width 3rem
    text-align center
    sans()
    small-caps(11)
    line-height 1
    color light-grey

.tagline
  display inline-block
  margin-right .4em
  sans-heavy()
  small-caps(11)

.no-touch
  .preview
    a
      link-hover(brand-color)

</style>
