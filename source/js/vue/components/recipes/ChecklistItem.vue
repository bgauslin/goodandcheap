<template lang="pug">
  li.item
    a(
      href="#",
      @click.prevent="toggleItem(id)",
      :class="{ saved : isSaved }",
    ) {{ item }}
</template>

<script>
export default {
  props: [
    'item',
    'itemIndex',
    'listIndex',
    'parentId',
  ],

  data () {
    return {
      isSaved: false,
    }
  },

  computed: {
    id () {
      return this.parentId + '.' + this.listIndex + '.' + this.itemIndex;
    }
  },

  created () {
    this.isSaved = this.isSavedIngredient(this.id);
  },

  methods: {
    isSavedIngredient (id) {
      let ids = this.$store.getters.ingredientsIds;
      let index = ids.indexOf(id);
      return (index !== -1) ? true : false;
    },
    toggleItem (id) {
      if (this.isSaved) {
        this.$store.commit('removeIngredient', id);
      } else {
        this.$store.commit('addIngredient', id);
      }
      this.isSaved = !this.isSaved;
    }
  }
}
</script>

<style lang="stylus">
@import '../../../../stylus/_config/'

.item
  margin 0

  a
    display block
    link(DARK_GREY, DARK_GREY, BRAND_COLOR)
    padding .5em 0 .5em 2em

    &::before
      color LIGHTER_GREY
      content ICON_CIRCLE_EMPTY
      display inline-block
      font-size px_to_em(22)
      icon()
      margin-left -1.3em
      position relative
      top .15em
      vertical-align baseline
      width 1.3em

    &.saved
      &::before
        color green
        content ICON_OK_CIRCLED

.no-touch
  .item
    a
      link_hover(BRAND_COLOR)

</style>
