<template lang="pug">
  li.preview
    router-link(:to="{ name: 'recipe', params: { slug: recipe.slug } }", :title="recipe.title")
      thumb(:image="recipe.thumb", :title="recipe.title")
      div.summary
        p.chapter-title(v-if="chapter") {{ recipe.chapter }}
        h3 {{ recipe.title }}
        p.tagline(v-if="tagline") {{ recipe.tagline }}
        badge(v-if="recipe.badge", :label="New")
        p.kind(v-if="{ recipe.kind == 'ideas' || recipe.kind == 'method' }", :class="recipe.kind|lower") {{ recipe.kind }}
    <!-- p.count {{ loop.index }} -->
</template>

<script>
import Thumb from './Thumb.vue'
import Badge from './Badge.vue'
export default {
  components: { Thumb, Badge },
  props: ['recipe']
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

</style>
