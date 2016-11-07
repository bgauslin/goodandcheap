<template lang="pug">
  ul.blurb-list
    li(v-for="item in list") {{ item }}
</template>

<script>
export default {
  props: ['list']
}
</script>

<style lang="stylus">
@import '../../../../../stylus/config/'

.blurb-list
  margin 0 0 1em

  li
    list-style none
    margin 0 0 .5em
    sans()
    font-size em(14)

</style>
