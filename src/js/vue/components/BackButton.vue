<template lang="pug">
  router-link.back-button(
    v-if="parent"
    :to="route"
    :title="parent.title"
  )
    span.back-button__label {{ parent.title }}
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

.back-button
  link(var(--header-color), var(--header-color), var(--header-color), var(--header-color))
  align-items center
  align-self stretch
  display flex
  height 100%
  line-height 1
  padding-left .75rem
  width 3rem
  
  @media breakpoint.small
    padding-left 0

  @media breakpoint.medium
    width auto

.back-button::before
  icon(icon-angle-left)
  font-size em(22)
  margin-right .25em
  position relative
  top -.05em

.back-button:active
  transform scale(.9)
  transition transform .3s ease

.back-button__label
  small_caps(12)
  typeface('sans_bold')
  display none
  white-space nowrap

  @media breakpoint.medium
    display block

</style>
