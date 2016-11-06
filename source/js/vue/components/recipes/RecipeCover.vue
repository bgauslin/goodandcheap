<template lang="pug">
  div.recipe-cover
    cover-photo(:image="image", :title="title")
    budget(:budget="budget")
</template>

<script>
import Budget from './Budget.vue'
import CoverPhoto from '../partials/CoverPhoto.vue'
import imagesLoaded from 'imagesloaded'

export default {
  components: { Budget, CoverPhoto },
  props: ['image', 'title', 'budget']
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.recipe-cover
  cover()

</style>
