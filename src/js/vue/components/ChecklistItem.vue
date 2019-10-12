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
    id() {
      return `${this.parentId}.${this.listIndex}.${this.itemIndex}`;
    },

    /** @return {boolean} */
    isSaved() {
      return this.ingredientsIds.includes(this.id);
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
        this.removeIngredient(this.id);
      } else {
        this.addIngredient(this.id);
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
  display block
  link(var(--dark-grey), var(--dark-grey), var(--brand-color), var(--brand-color))
  padding .5em 0 .5em 2em

.checklist__link::before
  color var(--lighter-grey)
  content '%s' % Icon.CIRCLE_EMPTY
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
  content '%s' % Icon.OK_CIRCLED

</style>
