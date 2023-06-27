<template lang="pug">
ClientOnly
  header.bg-darkblue.shadow-lg.text-white.px-3.shadow-layout.fixed.w-full.z-50.pb-1(class="md:pb-0 md:px-6")
    .mx-auto.py-2(class="md:py-3 lg:py-4")
      .grid.gap-4.order-1(class="grid-cols-3")
        p.text-sm.leading-none.col-span-2(style="max-width: 220px" class="md:col-span-1")
          NuxtLink.flex.items-center(to="/")
            Icon.text-xl.mr-2(name="flag:ua-4x3")
            h1.leading-tight.text-xl.text-lightblue.font-semibold BeestPrice
          span.text-xs Find the best price of your product, manage the target stores
        
        nav.flex.items-center.text-lg.order-2(class="md:order-3")
          .mr-5.grid.grid-flow-col.gap-3.ml-auto.mr-auto
          a.flex.items-center.text-white(rel="nofollow")
            Icon.mr-1(name="mdi:earth")
            span EN

        UiSearchInput.mx-auto.self-center.order-3.col-span-3(
          v-model="productsQuery"
          class="w-full md:w-[400px] md:order-2 md:col-span-1"
          @search="search"
        )
</template>

<script setup>
import { useMainStore } from '@/stores/main';
const router = useRouter();
const main = useMainStore();
const { productsQuery, getProducts, getProductsPending } = storeToRefs(main);

const search = async (query) => {
  if (!query) return
  if (query === router.currentRoute.value.query.query) router.go(0)
  router.push({name: 'search', query: { query }})
}
</script>

<style lang="postcss" scoped>
  header {
    position: sticky;
    top: 0;
  }
  .logo {
    width: 30px;
  }
</style>