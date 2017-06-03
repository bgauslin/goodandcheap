<template lang="pug">
  ul.checklist
    checklist-itpx_to_em(
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
  font-size px_to_em(15)
  list-style none
  margin 0 0 .5rem
  padding 0
  sans()

</style>
