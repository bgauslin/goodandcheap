<template lang="pug">
  ul.checklist
    checklist-item(
      v-for="(item, index) in items",
      :item="item",
      :itemIndex="index",
      :key="index",
      :listIndex="listIndex",
      :parentId="parentId",
    )
</template>

<script>
import ChecklistItem from './ChecklistItem.vue';
export default {
  components: { ChecklistItem },
  
  props: {
    items: Array,
    listIndex: Number,
    parentId: Number,
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.checklist
  font-size px_to_em(15)
  list-style none
  margin 0 0 px_to_rem(8)
  padding 0
  typeface('sans')

</style>
