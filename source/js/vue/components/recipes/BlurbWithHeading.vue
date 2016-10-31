<template lang="pug">
  div.copy-block
    h4 {{ heading }}
    div {{ blurb }}
</template>


<script>
export default {
  props: ['heading', 'blurb']
}
</script>


<style lang="stylus">
@import '../../../../stylus/config/'

.copy-block
  padding .5rem 0

  h4
    margin-bottom .25em
  p
    sans()

</style>
