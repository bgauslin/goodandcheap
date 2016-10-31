<template lang="pug">
  div.blurb(v-html="blurb")
</template>

<script>
export default {
  props: ['blurb']
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.blurb
  //padding 0 1rem 2rem

</style>
