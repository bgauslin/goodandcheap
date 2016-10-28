<template lang="pug">
</template>

<script>
export default {
}
</script>


<style lang="stylus">
@import '../../../../stylus/config/'

.results-count
  margin 1em 0
  text-align center
  body-font()

.query
  body-font-bold()

.no-results
  margin-top 2rem
  body-font()
  text-align center


@media(min-width breakpint-large)
  .search-results
    margin 0 auto
    width 50%

    .recipe-list
      width 100%

</style>
