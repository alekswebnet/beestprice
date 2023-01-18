<template lang="pug">
.flex.flex-1
  SearchSection.py-6.px-3(class="md:py-6 md:px-6")
  TheSidebar.hidden(class="lg:block")
</template>

<script>
import { useMainStore } from '@/stores/main'
const main = useMainStore();

async function search(query, stores) {
  main.productsQuery = query
  if (stores) main.productsStores = stores.split(',')
  main.productsPending = true
  const data = await $fetch(`${window.location.origin}/api/search?qr=${query}${stores ? '&stores=' + stores : ''}`)
  main.products = data
  main.productsPending = false
}

export default {
  beforeRouteEnter: async function (to, from, next) {
    const { query, stores } = to.query
    search(query, stores)
    return next()
  },
  beforeRouteUpdate: async function (to, from, next) {
    const { query, stores } = to.query
    search(query, stores)
    return next()
  }
}
</script>