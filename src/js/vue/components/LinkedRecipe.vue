<template lang="pug">
  .linked-recipe
    h3.linked-recipe__heading
      a.linked-recipe__link(
        :href="linkedRecipe.link.slug"
        :title="linkedRecipe.link.title"
      ) {{ linkedRecipe.heading }}
    .linked-recipe__blurb(
      v-html="linkedRecipe.blurb"
    )
</template>

<script>
export default {
  props: {
    linkedRecipe: {
      blurb: String,
      link: {
        slug: String,
        title: String,
      },
    },
  }
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.linked-recipe
  margin 0 0 1rem

.linked-recipe__blurb p
  typeface('sans')

</style>
