<template lang="pug">
  p.budget(v-if="budget")
    span.total {{ budget.totalCost }} Total
    span.cost {{ budget.unitCost }} / {{ budget.units }}
</template>

<script>
export default {
  props: ['budget']
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.budget
  position-it(absolute, 3em, 0, null, null)
  padding .5em 2em .5em 1em
  background rgba(white, 0.97)
  animation slideInRight .3s ease-out

  sans-heavy()
  small-caps()

  .total
  .cost
    display block

</style>
