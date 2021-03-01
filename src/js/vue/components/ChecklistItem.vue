<template lang="pug">
  li.checklist__item
    a.checklist__link(
      :class="{ 'saved' : isSaved }",
      @click.prevent="toggleItem()",
      href="#",
    ) {{ item }}
</template>

<script>
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';

export default {
  props: {
    id: Number,
    item: String,
    itemIndex: Number,
    listIndex: Number,
    parentId: Number,
  },

  computed: {
    ...mapGetters([
      'ingredientsIds',
    ]),

    /** @return {string} */
    itemId() {
      return `${this.parentId}.${this.listIndex}.${this.itemIndex}`;
    },

    /** @return {boolean} */
    isSaved() {
      return this.ingredientsIds.includes(this.itemId);
    },
  },

  methods: {
    ...mapMutations([
      'addIngredient',
      'removeIngredient',
    ]),

    /** Adds/removes the ingredient from the user's saved list of ingredients. */
    toggleItem() {
      if (this.isSaved) {
        this.removeIngredient(this.itemId);
      } else {
        this.addIngredient(this.itemId);
      }
    },
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.checklist__item
  margin 0

.checklist__link
  link(var(--dark-grey), var(--dark-grey), var(--brand-color), var(--brand-color))
  display block
  padding .5em 0 .5em 2em

.checklist__link::before
  icon(icon-circle-empty)
  color var(--lighter-grey)
  display inline-block
  font-size em(22)
  margin-left -1.3em
  position relative
  top .15em
  vertical-align baseline
  width 1.3em

.checklist__link.saved::before
  color green
  content icon-ok-circled

</style>
