<template lang="pug">
  div.recipe-cover(:class="{ gallery : photos > 1 }")
    img(
      v-for="photo in photos",
      :src="photo.src",
      :width="photo.width",
      :height="photo.height",
      :title="photo.title"
    )
    <!-- budget(:budget="budget") -->
</template>

<script>
import Budget from './Budget.vue'

export default {
  components: { Budget },
  props: ['photos', 'title', 'budget']
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.recipe-cover
  cover()

</style>
