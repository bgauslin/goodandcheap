<template lang="pug">
  div.variation
    img(
      src="variation.photo.url",
      title="variation.photo.title"
    )
    h4 {{ heading }}
</template>

<script>
export default {
  props: ['variation']
}
</script>
