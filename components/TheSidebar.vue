<template lang="pug">
aside(aria-label="Sidebar")
  .h-full.flex.flex-col.border-l.bg-white
    .overflow-y-auto.flex-1.pb-3.px-6
      h3.pt-6.mb-3.text-darkblue.flex.text-lg
        | Stores 
        span.ml-auto.ordinal {{ productsStores.length }}/{{ stores.length }}
      ul.grid.gap-2
        li.flex(
          v-for="store in [...stores.sort()]"
          :key="store"
        )
          .flex.items-center
            .h-6.w-6.flex.items-center.justify-center.mr-2
              img.w-auto.max-h-4(:src="getStoreIcon(store)")
            h4 {{ store }}
          UiSwitch.ml-auto(v-model="productsStores" :value="store")
    .footer.pb-6.px-6
      UiButton.block.w-full(@click="apply") Appy filters and search
</template>

<script setup>
import { Store } from '~~/types'
import { useMainStore } from '@/stores/main'
const stores = Object.keys(Store)
const main = useMainStore()
const { productsStores, productsQuery } = storeToRefs(main)
const router = useRouter();

function apply() {
  router.push({name: 'search', query: { query: productsQuery.value, stores: productsStores.value.join(',') }})
}
</script>


<style lang="postcss" scoped>
aside {
  width: 360px;
  position: sticky;
  top: 78px;
  bottom: 0;
  height: calc(100vh - 78px);
}
</style>