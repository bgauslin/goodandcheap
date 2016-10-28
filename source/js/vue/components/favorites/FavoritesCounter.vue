<template lang="pug">
  button.favorites-counter
</template>

<script>
export default {
  //props: ['count']

  data () {
    return {
      isVisible: true,
      count: 2
    }
  },

  created () {
    this.getFavoritesCount(this.count)
  },

  methods: {
    getFavoritesCount(count) {
      console.log('count = ' + count)
    }
  }

}
</script>


<style lang="stylus">
@import '../../../../stylus/config/'

.favorites-counter
  display flex
  justify-content center
  align-items center
  align-self stretch
  width header-height-base
  line-height 1
  color white

  body-font()
  font-size em(11)
  color white

  &::after
    margin-left .25em
    icon()
    content '\e80b' // heart-empty
    font-size 1rem

  &.current::after
    content '\e80a' // heart

  &.updated
    animation bounce 500ms ease

</style>
