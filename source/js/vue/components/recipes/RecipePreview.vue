<template lang="pug">
  li.preview
    router-link(:to="{ name: 'recipe', params: { slug: recipe.slug } }", :title="recipe.title")
      figure.thumb
        img(
          :src="recipe.thumb.src",
          :width="recipe.thumb.width",
          :height="recipe.thumb.height",
          :alt="recipe.title"
        )
      div.summary
        p.chapter-title(v-if="chapter") {{ recipe.chapter }}
        h3 {{ recipe.title }}
        p.tagline(v-if="tagline") {{ recipe.tagline }}
        p.new(v-if="recipe.badge") New
        p.kind(v-if="{ recipe.kind == 'ideas' || recipe.kind == 'method' }", :class="recipe.kind|lower") {{ recipe.kind }}
    <!-- p.count {{ loop.index }} -->
</template>

<script>
export default {
  props: ['recipe']
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

</style>
