<template lang="pug">
  p.budget(
    v-if="budget"
  )
    span.total {{ budget.totalCost }} Total
    span.cost {{ budget.unitCost }} / {{ budget.units }}
</template>

<script>
export default {
  props: ['budget']
}
</script>

<style lang="stylus">
@import '../../../../stylus/_config/'

.budget
  background rgba(WHITE, 0.97)
  padding .5em 2em .5em 1em
  position_it(absolute, 3em, 0, null, null)
  font_sans_heavy()
  small_caps()

  .total
  .cost
    display block

</style>
