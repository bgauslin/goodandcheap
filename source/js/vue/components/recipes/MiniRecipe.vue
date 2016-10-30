<template lang="pug">
  div.mini-recipe
    div.contents
      h4 {{ miniRecipe.heading }}
      div {{ miniRecipe.blurb }}
      ol.ingredients
        li(v-for="ingredient in miniRecipe.ingredients") {{ ingredient }}
    figure
      img(
        src="miniRecipe.thumb.url",
        width="miniRecipe.thumb.width",
        height="miniRecipe.thumb.height",
        title="miniRecipe.thumb.title"
      )
</template>

<script>
export default {
  props: ['miniRecipe']
}
</script>
