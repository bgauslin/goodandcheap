<template lang="pug">
  section.favorites
</template>



<style lang="stylus">
@import '../../../../stylus/config/'

.favorites
  h2
    margin 1em 0
    text-align center
    sans-heavy()
    small-caps(14)

  .no-favorites
    margin-top 2rem
    text-align center
    sans()

    p
      margin 0 0 1em

  .recipe-list
    width 100%

    @media(min-width breakpoint-small)
      margin 0 auto 2rem

</style>
