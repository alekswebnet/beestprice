<template lang="pug">
.container.mx-auto
  .flex.w-full(v-if="getProductsPending")
    .flex.mx-auto
      ThemeLoader.text-darkblue(size="24px")
      span.ml-3.text-lg.tex-darkblue Searching for products, please wait...
  .flex.items-center.mb-3.text-lg(v-if="!getProductsPending && getProducts" class="md:mb-6")
    span.font-bold.ordinal.text-gray-500 {{ getProducts.length }} 
    | {{`&nbsp;parsed / `}}
    span.font-bold.text-darkblue.ordinal &nbsp;{{ getProducts.filter(item => item.rating > 0.14).length }} 
    | &nbsp;most relevant to "{{ $route.query.query }}" &nbsp;
  .products.gap-3(v-if="!getProductsPending" class="md:gap-6")
    a(
      v-for="product, index in getProducts" 
      :key="index"
      :href="product.link" 
      target="_blank"
    )
      ThemeCard(:rating="product.rating")
        template(v-slot:title) 
          ThmeCuttedText(:lines="3")
            span {{ product.title }}
        template(v-slot:thumbnail)
          img.w-auto.mx-auto(:src="product.thumbnail || null" class="md:h-[100px] max-h-[100px] max-w-[100px] mw-md-auto")
        template(v-slot:price)
          span {{ product.price }}
        template(v-slot:store)
          img.w-auto.h-7(:src="getStoreIcon(product.store)")
        template(v-slot:footer)
</template>

<script setup>
import { useMainStore } from '@/stores/main';
const main = useMainStore();
const { getProducts, getProductsPending, getProductsQuery } = storeToRefs(main);
const relevantCoef = 0.15
</script>

<style scoped>
.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  align-items: stretch;
}
</style>