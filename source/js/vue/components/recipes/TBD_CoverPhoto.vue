<template lang="pug">
div.gallery
  figure
    img(
      :src="image.url",
      :width="image.width",
      :height="image.height",
      :title="image.title"
    )
</template>
