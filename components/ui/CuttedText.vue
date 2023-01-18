<template lang="pug">
span(:style="{ '--clamp-lines': props.lines }")
  slot
</template>

<script setup>
const props = defineProps({
  lines: {
    type: [Number],
    default: 1
  }
})
</script>


<style scoped>
span {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  -webkit-line-clamp: var(--clamp-lines, 1);
}
</style>