<template lang="pug">
  ul
    li(v-for="item in list") {{ item }}
</template>

<script>
export default {
  props: ['list']
}
</script>
