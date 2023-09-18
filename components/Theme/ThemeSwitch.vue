<template lang="pug">
label.relative.inline-flex.items-center.cursor-pointer
  input(type="checkbox" class="sr-only peer" :value="value" v-model="model")
  .w-11.h-6.bg-gray-200.rounded-full.peer(
    class="peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lightblue"
  )
    slot
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: false
  },
  value: {
    type: String,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get () {
    return props.modelValue
  },

  set (value) {
    return emit('update:modelValue', value)
  }
})
</script>