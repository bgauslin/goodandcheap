<template lang="pug">
  p.budget
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
  sans-heavy()
  small-caps(11)

  .total
  .cost
    display block


</style>
