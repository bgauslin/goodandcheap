<template lang="pug">
  header.header
    .header__frame
      h1.app-name
        router-link(
          class="app-name__link"
          to="/"
          title="Home"
          exact
        ) Good And Cheap
</template>

<style lang="stylus">
@import '../../../stylus/config/'

.header
  @extends $app-bar-parent
  elevation(2)
  background var(--brand-color)
  grid-area header
  position sticky
  top 0

.header__frame
  @extends $app-bar-child

.app-name
  small_caps(14)
  typeface('sans_bold')
  display flex
  height 100%
  place-content center
  white-space nowrap

@media breakpoint.medium
  .app-name.search-enabled
    display none

.app-name__link
  link(var(--header-color), var(--header-color), var(--header-color), var(--header-color))
  align-items center
  align-self stretch
  display flex
  position relative
  z-index 2

.app-name__link:active
  transform scale(.9)
  transition .3s ease

[no-touch] .app-name__link.current
  color var(--header-color)
  cursor default

[no-touch] .app-name__link.current:active
  transform none

</style>
