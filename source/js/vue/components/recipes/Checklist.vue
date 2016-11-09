<template lang="pug">
  ul.checklist
    checklist-item(
      v-for="(item, index) in items",
      :item="item",
      :parentId="parentId",
      :listIndex="listIndex",
      :itemIndex="index"
    )
</template>

<script>
import ChecklistItem from './ChecklistItem.vue'
export default {
  components: { ChecklistItem },
  props: ['items', 'listIndex', 'parentId']
}
</script>

<style lang="stylus">
@import '../../../../stylus/config/'

.checklist
  margin 0 0 .5rem
  padding 0

  list-style none
  sans()
  font-size em(15)

</style>
