<template lang="pug">
  div.blurb(v-if="blurb" v-html="blurb")
</template>

<script>
export default {
  props: ['blurb']
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.blurb
  p
    margin 0 0 1em
    serif()

</style>
