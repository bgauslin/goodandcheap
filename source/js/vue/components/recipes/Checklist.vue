<template lang="pug">
  ul.checklist
    checklist-item(
      v-for="(item, index) in items",
      :item="item",
      :index="index"
    )
</template>

<script>
import ChecklistItem from './ChecklistItem.vue'
export default {
  components: { ChecklistItem },
  props: ['items']
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.checklist
  margin 0 0 2em
  padding 0

  list-style none
  sans()
  font-size em(15)

</style>
