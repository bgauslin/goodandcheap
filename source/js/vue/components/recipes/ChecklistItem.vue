<template lang="pug">
  li.checklist__item
    a.checklist__link(
      :class="{ saved : isSaved }",
      @click.prevent="toggleItem(id)",
      href="#",
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

  data() {
    return {
      isSaved: false,
    }
  },

  created() {
    this.isSaved = this.isSavedIngredient(this.id);
  },

  computed: {
    /** @return {string} */
    id() {
      return `${this.parentId}.${this.listIndex}.${this.itemIndex}`;
    },
  },

  methods: {
    /** 
     * @param {!string} id - ...
     * @return {boolean}
     */
    isSavedIngredient(id) {
      const ids = this.$store.getters.ingredientsIds;
      const index = ids.indexOf(id);
      return (index !== -1);
    },

    /** 
     * @param {!string} id - ...
     * @return {boolean}
     */
    toggleItem(id) {
      if (this.isSaved) {
        this.$store.commit('removeIngredient', id);
      } else {
        this.$store.commit('addIngredient', id);
      }
      this.isSaved = !this.isSaved;
    },
  },
}
</script>

<style lang="stylus">
@import '../../../../stylus/_config/'

.checklist__item
  margin 0

.checklist__link
  display block
  link(Colors.DARK_GREY, Colors.DARK_GREY, BRAND_COLOR)
  padding .5em 0 .5em 2em

  &::before
    color '%s' % Colors.LIGHTER_GREY
    content ICON_CIRCLE_EMPTY
    display inline-block
    font-size px_to_em(22)
    icon()
    margin-left -1.3em
    position relative
    top .15em
    vertical-align baseline
    width 1.3em

.checklist__link.saved::before
  color green
  content ICON_OK_CIRCLED

.no-touch .checklist__link
  link_hover(BRAND_COLOR)

</style>
