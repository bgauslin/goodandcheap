<template lang="pug">
  div.mini-recipe
    div.contents
      h4 {{ miniRecipe.heading }}
      div(v-html="miniRecipe.blurb")
      ol.ingredients
        li(v-for="ingredient in miniRecipe.ingredients") {{ ingredient }}
    figure(v-if="miniRecipe.photo")
      img(
        :src="miniRecipe.photo.src",
        :width="miniRecipe.photo.width",
        :height="miniRecipe.photo.height",
        :title="miniRecipe.photo.title"
      )
</template>

<script>
export default {
  props: ['miniRecipe']
}
</script>
