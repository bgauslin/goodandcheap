<template lang="pug">
  li.checklist__item
    a.checklist__link(
      :class="{ saved : isSaved }",
      @click.prevent="toggleItem(id)",
      href="#",
    ) {{ item }}
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: {
    item: String,
    itemIndex: Number,
    listIndex: Number,
    parentId: Number,
  },

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
    ...mapMutations([
      'addIngredient',
      'removeIngredient',
    ]),
    /** 
     * Whether the ingredient has been checked by the user and saved.
     * @param {!string} id
     * @return {boolean}
     */
    isSavedIngredient(id) {
      const ids = this.$store.getters.ingredientsIds;
      const index = ids.indexOf(id);
      return (index !== -1);
    },

    /** 
     * Adds/removes the ingredient from the user's saved list of ingredients.
     * @param {!string} id
     * @return {boolean}
     */
    toggleItem(id) {
      if (this.isSaved) {
        this.removeIngredient(id);
      } else {
        this.addIngredient(id);
      }
      this.isSaved = !this.isSaved;
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
