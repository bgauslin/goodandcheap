<template lang="pug">
  li.checklist__item
    label.checklist__label(
      :for="itemId"
    )
      input.checklist__checkbox(
        type="checkbox"
        :id="itemId"
        :checked="isSaved"
        @click="toggleItem()"
      )
      svg(
        :class="['checklist__icon', isSaved ? 'checklist__icon--checked' : 'checklist__icon--unchecked']"
        viewbox="0 0 24 24"
        aria-hidden="true"
      )
        circle(
          v-if="!isSaved"
          cx="12"
          cy="12"
          r="10"
        )
        circle(
          v-if="isSaved"
          cx="12"
          cy="12"
          r="12"
        )
        polyline(
          v-if="isSaved"
          points="5,12 10,17 19,8"
        )
      template {{ item }}
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
  margin 0

.checklist__label
  cursor pointer
  display inline-block
  line-height 1
  padding rem(8) rem(4) rem(8) rem(32)
  transition color transition

  &:focus
  &:active
  [no-touch] &:hover
    color var(--text-2-color)

.checklist__checkbox
  appearance none
  border 0
  flex 0 0
  height 0
  margin 0
  outline 0

.checklist__icon
  height rem(24)
  margin rem(-2) rem(8) 0 rem(-32)
  width rem(24)

.checklist__icon--unchecked
  & > circle
    fill none
    stroke var(--text-3-color)
    stroke-width 3

.checklist__icon--checked
  & > circle
    fill var(--checked-color)

  & > polyline
    fill none
    stroke var(--background-1)
    stroke-width 3

</style>
