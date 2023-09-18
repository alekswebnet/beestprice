<template lang="pug">
.border.rounded.overflow-hidden.flex
  input(
    v-model="model"
    name="search"
    type="text" 
    class="w-full px-6 py-3 text-black rounded-none" 
    placeholder="Search..."
    @keyup.enter="emit('search', model)"
  )
  button.flex.items-center.justify-center.px-4.border-l(
    @click="emit('search', model)"
  )
    Icon.text-grey-dark.text-xl(name="mdi:magnify")
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['search', 'update:modelValue'])

const model = computed({
  get () {
    return props.modelValue
  },

  set (value) {
    return emit('update:modelValue', value)
  }
})
</script>