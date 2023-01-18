import { Store } from '~~/types'

export const useMainStore = defineStore('main', {
  state: () => ({
    productsQuery: '',
    products: [],
    productsPending: false,
    productsStores: Object.keys(Store)
  }),
  getters: {
    getProducts: (state) => state.products,
    getProductsPending: (state) => state.productsPending,
    getProductsQuery: (state) => state.productsQuery,
    getProductStores: (state) => state.productsStores
  }
})