<template lang="pug">
  div.linked-recipe
    h3
      a(
        :href="linkedRecipe.link.slug",
        :title="linkedRecipe.link.title"
      ) {{ linkedRecipe.heading }}
    div(v-html="linkedRecipe.blurb")
</template>

<script>
export default {
  props: ['linkedRecipe']
}
</script>


<style lang="stylus">

.linked-recipe
  margin 0 0 1rem
  padding 0 1rem 1rem

</style>
