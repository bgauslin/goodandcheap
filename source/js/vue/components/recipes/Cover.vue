<template lang="pug">
  div.cover(:class="{ gallery : photos > 1 }")
    img(
      v-for="photo in photos",
      :src="photo.src",
      :width="photo.width",
      :height="photo.height",
      :title="photo.title"
    )
    budget(:budget="budget")
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

.cover
  cover()
  @media(min-width breakpoint-small)
    cover-small()

  .budget
    position-it(absolute, 3em, 0, null, null)
    padding .5em 2em .5em 1em
    background rgba(white, 0.97)

</style>
