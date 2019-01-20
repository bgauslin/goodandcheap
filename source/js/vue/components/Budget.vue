<template lang="pug">
  p.budget(
    v-if="budget",
  )
    span.budget__total {{ budget.totalCost }} Total
    span.budget__cost {{ budget.unitCost }} / {{ budget.units }}
</template>

<script>
export default {
  props: ['budget'],
}
</script>

<style lang="stylus">
@import '../../../stylus/config/';

.budget
  background rgba(white, .97)
  padding .5em 2em .5em 1em
  position_it(absolute, 3em, 0, null, null)
  small_caps()
  typeface('sans_bold')

.budget__total
.budget__cost
  display block

</style>
