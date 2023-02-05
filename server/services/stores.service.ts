import { IStoreConfig } from "~~/types"

export const getAllStoresConfig = (): IStoreConfig[] => ([
  {
    name: 'BudynokIgrashok',
    origin: 'https://bi.ua',
    searchPrefix: (query) => `/ukr/gsearch/?search=${query}`,
    selectors: {
      search: {
        results: {
          container: '.catalog',
          item: '.goodsItem',
          title: '.itemDes',
          price: '.costIco',
          link: '.goodsItemLink',
          thumbnail: '.goodsItemLink img.itemImg'
        }
      },
      product: {
        title: 'h1[itemprop="name"]',
        price: '.prodBuy:has(.addPTBj) .costIco[itemprop="price"]',
        thumbnail: 'img.prodImg'
      }
    }
  },
  {
    name: 'Foxtrot',
    origin: 'https://www.foxtrot.com.ua',
    searchPrefix: (query) => `/uk/search?query=${query}`,
    selectors: {
      search: {
        results: {
          container: '.listing__body',
          item: '.card',
          title: '.card__title',
          price: '.card-price',
          link: '.card__image a',
          thumbnail: '.card__image img'
        }
      },
      product: {
        title: 'h1.page__title',
        price: '.product-box__main_price',
        thumbnail: '.product-img__carousel img'
      }
    }
  },
  {
    name: 'Rozetka',
    origin: 'https://rozetka.com.ua',
    searchPrefix: (query) => `/ua/search/?text=${query}`,
    selectors: {
      search: {
        results: {
          container: '.catalog-grid',
          item: '.goods-tile:not(.goods-tile_state_disabled)',
          title: '.goods-tile__title',
          price: '.goods-tile__price-value',
          link: '.goods-tile__picture',
          thumbnail: 'img.ng-lazyloaded'
        }
      },
      product: {
        title: 'h1.product__title',
        price: '.product-prices__big',
        thumbnail: 'img.picture-container__picture'
      }
    }
  },
  {
    name: 'FUa',
    origin: 'https://f.ua',
    searchPrefix: (query) => `/ua/search/?qr=${query}`,
    selectors: {
      search: {
        results: {
          container: '.catalog',
          item: '.catalog_item',
          title: '.title a',
          price: '.price > span:not(.old, .empty_old)',
          link: '.img a',
          thumbnail: '.img img.selected'
        }
      },
      product: {
        title: '.product-grid__title h1',
        price: '.price:has(.buy_button) > div:not(.old, .empty_old)',
        thumbnail: 'img.zoom_active'
      }
    }
  },
  {
    name: 'Olx',
    origin: 'https://www.olx.ua',
    searchPrefix: (query) => `/d/uk/list/q-${query.split(' ').join('-')}/`,
    selectors: {
      search: {
        results: {
          container: '.listing-grid-container',
          item: '[data-cy="l-card"]',
          title: 'h6',
          price: '[data-testid="ad-price"]',
          link: 'a',
          thumbnail: 'img'
        }
      },
      product: {
        title: 'h1[data-cy="ad_title"]',
        price: '[data-testid="ad-price-container"]',
        thumbnail: '[data-testid="swiper-image"]'
      }
    }
  },
  {
    name: 'Panama',
    origin: 'https://panama.ua',
    searchPrefix: (query) => `/ua/search/?q=${query}`,
    selectors: {
      search: {
        results: {
          container: '.catalog-list',
          item: '.product__item:not(.out-of-stock)',
          title: '.product__desk',
          price: '.product__price',
          link: '.product__link',
          thumbnail: '.product__image img'
        }
      },
      product: {
        title: '.product-item__name',
        price: '.product__price',
        thumbnail: 'img[itemprop="image"]'
      }
    }
  },
  {
    name: 'Prom',
    origin: 'https://prom.ua',
    searchPrefix: (query) => `/search?search_term=${query}`,
    selectors: {
      search: {
        results: {
          container: '[data-qaid="product_gallery"]',
          item: '.js-productad',
          title: '[data-qaid="product_name"]',
          price: '[data-qaid="product_price"]',
          link: '[data-qaid="product_link"]',
          thumbnail: '[data-qaid="image_link"] img'
        }
      },
      product: {
        title: 'h1[data-qaid="product_name"]',
        price: '[data-qaid="product_price"]',
        thumbnail: '[data-qaid="image_block"] img'
      }
    }
  },
  {
    name: 'Comfy',
    origin: 'https://comfy.ua',
    searchPrefix: (query) => `/ua/search/?q=${query}`,
    selectors: {
      search: {
        results: {
          container: '.products-catalog',
          item: '.products-list-item',
          title: '.products-list-item__name',
          price: '.products-list-item__actions-price-current',
          link: '.products-list-item__name',
          thumbnail: '.ci-sl__slide-img'
        }
      },
      product: {
        title: 'h1.gen-tab__name',
        price: '.info-buy .price__current',
        thumbnail: '.gallery__carousel img.fit'
      }
    }
  },
  {
    name: 'Maudau',
    origin: 'https://maudau.com.ua',
    searchPrefix: (query) => `/search/search=${query}`,
    selectors: {
      search: {
        results: {
          container: '.listing .product-listing',
          item: '.product.product-tile',
          title: 'a.product-name',
          price: '.price_final:not(.out-of-stock)',
          link: 'a.product-link-image',
          thumbnail: '.product-image__thumb'
        }
      },
      product: {
        title: 'h1.product-title',
        price: '.price_final:not(.out-of-stock)',
        thumbnail: '.slider-item img'
      }
    }
  },
  {
    name: 'Moyo',
    origin: 'https://www.moyo.ua',
    searchPrefix: (query) => `/ua/search/new/?q=${query}`,
    selectors: {
      search: {
        results: {
          container: '.search_products',
          item: '.product-item',
          title: 'a.product-item_name',
          price: '.sale',
          link: 'a.product-item_img',
          thumbnail: 'img.first-image'
        }
      },
      product: {
        title: 'h1.product_name',
        price: '.product_price_current.sale > span',
        thumbnail: '.product_image_item img'
      }
    }
  },
])