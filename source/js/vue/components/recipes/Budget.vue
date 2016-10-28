<template lang="pug">
  p.budget
    span.total ${{ totalCost }} Total
    span.cost ${{ unitCost }} / {{ budget.units }}
</template>


<script>
export default {

  props: ['budget'],

  computed: {
    unitCost () {
      let cost = budget.totalCost / budget.quantity
      // TODO: format to two decimal places
      return cost
    },
    totalCost () {
      // TODO: format to two decimal places
      // return budget.cost|number_format(2, '.', ',') }}
    }
  }

}

</script>


<style lang="stylus">
@import '../../../../stylus/config/'

.budget
  body-font-bold()
  small-caps(11)

  .total
  .cost
    display block


</style>
