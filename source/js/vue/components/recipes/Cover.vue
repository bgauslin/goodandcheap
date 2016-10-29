<template lang="pug">
  div.cover
    img(
      :src="image.url",
      :width="image.width",
      :height="image.height",
      :title="image.title"
    )
</template>


<style lang="stylus">
@import '../../../../stylus/config/'

.cover
  cover()
  @media(min-width breakpoint-small)
    cover-small()

  .budget
    position-it(absolute, 3em, 0, null, null)
    padding .5em 2em .5em 1em
    background rgba(white, 0.97)

</style>
