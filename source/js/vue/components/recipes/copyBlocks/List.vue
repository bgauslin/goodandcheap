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
@import '../../../../../stylus/_config/'

.blurb-list
  margin 0 0 1em

  li
    font-size px_to_em(14)
    list-style none
    margin 0 0 .5em
    sans()

</style>
