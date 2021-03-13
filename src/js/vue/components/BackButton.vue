<template lang="pug">
  router-link.back(
    v-if="parent"
    :to="route"
    :title="parent.title"
    exact
  ) {{ parent.title }}
  router-link.back(
    v-else
    to="/"
    title="Home"
    exact
  ) Good And Cheap
</template>

<script>
export default {
  props: {
    parent: {
      routeName: String,
      slug: String,
      title: String,
    },
  },

  computed: {
    /** @return {Object} */
    route() {
      if (this.parent.slug) {
        return {
          name: this.parent.routeName,
          params: { 
            slug: this.parent.slug
          }
        };
      } else {
        return {
          name: this.parent.routeName
        };
      }
    }
  },
}
</script>

<style lang="stylus">
@import '../../../stylus/config/'

.back
  link(var(--header-color), var(--header-color), var(--header-color), var(--header-color))
  small_caps(14)
  typeface('sans_bold')
  line-height controls-size
  overflow hidden
  text-overflow ellipsis
  transform-origin 0 50%
  transition transform .3s ease
  white-space nowrap

.back:active
  transform scale(.9)

.back::before
  icon(icon-angle-left)
  font-size em(22)
  margin-inline-end .25rem

.back.exact.active
  pointer-events none

.back.exact.active::before
  display none

</style>
