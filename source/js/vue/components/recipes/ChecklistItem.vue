<template lang="pug">
  li.item
    a(
      href="#",
      @click.prevent="toggleItem(id)",
      :class="{ saved : isSaved }"
    ) {{ item }}
</template>

<script>
export default {
  props: ['item', 'itemIndex', 'listIndex', 'parentId'],

  data () {
    return {
      isSaved: false
    }
  },

  computed: {
    id () {
      return this.parentId + '.' + this.listIndex + '.' + this.itemIndex
    }
  },

  created () {
    this.isSaved = this.isSavedIngredient(this.id)
  },

  methods: {
    toggleItem (id) {
      if (this.isSaved) {
        this.$store.commit('removeIngredient', id)
      } else {
        this.$store.commit('addIngredient', id)
      }
      this.isSaved = !this.isSaved
    },

    isSavedIngredient (id) {
      var ids = this.$store.getters.ingredientsIds
      var index = ids.indexOf(id)
      return (index !== -1) ? true : false
    }
  }
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.item
  margin 0

  a
    display block
    padding .5em 0 .5em 2em
    link(dark-grey, dark-grey, brand-color)

    &::before
      display inline-block
      width 1.3em
      margin-left -1.3em
      icon()
      content '\e806' // circle-empty
      font-size em(22)
      color lighter-grey
      vertical-align baseline
      position relative
      top .15em

    &.saved
      &::before
        content '\e807' // ok-circled
        color green

.no-touch
  .item
    a
      link-hover(brand-color)

</style>
