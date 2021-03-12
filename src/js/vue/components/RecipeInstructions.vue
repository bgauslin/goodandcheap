<template lang="pug">
  .instructions
    template(
      v-for="block in content"
    )
      h2.instructions__heading(
        v-if="block.heading"
      ) {{ block.heading }}
        span.instructions__steps {{ itemsLabel(block.steps) }}

      h2.instructions__heading(
        v-else
      ) {{ itemsLabel(block.steps) }}

      ul.instructions__list(
        v-if="block.steps.length === 1"
      )
        li.instructions__item(
          v-for="step in block.steps"
        ) {{ step }}

      ol.instructions__list(
        v-else
      )
        li.instructions__item(
          v-for="step in block.steps"
        ) {{ step }}
</template>

<script>
export default {
  props: {
    content: Array,
    parentId: Number,
  },

  methods: {
    /**
     * Renders a label if there are multiple instruction steps in the recipe.
     * @param {!number} count
     * @return {string}
     */
    itemsLabel(count) {
      const number = count.length;
      if (number > 1) {
        return `${number} Steps`;
      }
    },
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.instructions__heading
  small_caps()
  typeface('sans_bold')
  margin 1rem 0
  padding 0

.instructions__steps
.instructions__list
  typeface('sans')

.instructions__steps
  color var(--text-2-color)
  margin-left 1em

.instructions__list
  font-size em(15)
  margin 0
  padding 0

ol.instructions__list
  padding 0 0 0 1.3rem

ul .instructions__item
  list-style none

.instructions__item
  margin 0 0 1em

</style>
