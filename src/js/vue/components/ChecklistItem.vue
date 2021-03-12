<template lang="pug">
  li.checklist__item
    input.checklist__checkbox(
      type="checkbox"
      :id="itemId"
      :checked="isSaved"
      @click="toggleItem()"
    )
    label.checklist__label(
      :for="itemId"
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

checkbox-size = rem(24)

.checklist__item
  align-items center
  display flex
  margin 0

.checklist__checkbox
  appearance none
  flex 0 0 checkbox-size
  height checkbox-size
  margin rem(8) 0
  outline 0

.checklist__checkbox
.checklist__label
  cursor pointer

.checklist__checkbox::before
  icon(icon-circle-empty)
  color var(--text-3-color)
  display block
  font-size rem(22)

.checklist__checkbox:checked::before
  color var(--checked-color)
  content icon-ok-circled

.checklist__label
  link(var(--text-1-color), var(--text-1-color), var(--text-2-color), var(--text-2-color))
  padding rem(8) rem(4)

</style>
