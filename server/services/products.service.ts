import { Page } from 'puppeteer-core';
import { IProduct, IStoreConfig, Store } from '~~/types';
import { getAllStoresConfig } from './stores.service';
import currency from 'currency.js';
import puppeteer from 'puppeteer-core';
import * as stringSimilarity from 'string-similarity';

const BROWSERLESS_API_KEY = 'e7ad3d3f-128e-4b00-9286-ce20fb36884b';

export const getProductList = async (
  query: string, 
  stores?: (keyof typeof Store)[]
) => {
  let results = [] as IProduct[];
  const storesConfig = getAllStoresConfig()
    .filter(config => stores && stores.length ? stores.includes(config.name) : true )

  const browser = await puppeteer.connect({
    browserWSEndpoint: `wss://chrome.browserless.io?token=${BROWSERLESS_API_KEY}&stealth&blockAds`
  });

  const task = async ({ page, data: config }: { page: Page, data: IStoreConfig }) => {
    let products = [] as any[]
    const productTitle = config.selectors.product.title
    const productPrice = config.selectors.product.price
    const productThumbnail = config.selectors.product.thumbnail
    const resultsSelector = `${config.selectors.search.results.container} ${config.selectors.search.results.item}`
    const resultTitleSelector = config.selectors.search.results.title
    const resultPriceSelector = config.selectors.search.results.price
    const resultThumbnailSelector = config.selectors.search.results.thumbnail
    const resultLinkSelector = config.selectors.search.results.link
    
    await page.goto(`${config.origin}${config.searchPrefix(query)}`, { waitUntil: 'networkidle2', timeout: 60000 })
    await page.waitForSelector(`${resultsSelector}, ${productTitle}`, { timeout: 5000 })

    const count = await page.$$eval(resultsSelector, a => a.length)
    const isSingle = await page.$$eval(productTitle, a => a.length)

    console.warn(config.name, count, isSingle)

    if (count) {
      await page.evaluate(async () => {
        window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: 'smooth' })
        await new Promise(resolve => setTimeout(resolve, 2000));
      });

      const tcount = await page.$$eval(resultTitleSelector, a => a.length)
      console.log(tcount)
  
      for (let index = 0; index < count; index++) {
        const product = await page.$$eval(`${resultsSelector}`, async (
          el, 
          index,
          resultTitleSelector,
          resultPriceSelector,
          resultThumbnailSelector,
          resultLinkSelector
        ) => {
          const title =  el[index].querySelector(resultTitleSelector)?.textContent
          const price = el[index].querySelector(resultPriceSelector)?.textContent
          const thumbnail = el[index].querySelector(resultThumbnailSelector)?.getAttribute('src')
          const link = el[index].querySelector(resultLinkSelector)?.getAttribute('href')
  
          if (title && price && thumbnail && link) {
            return {
              title,
              price,
              thumbnail,
              link
            }
          } else {
            return null
          }
        }, 
          index,
          resultTitleSelector,
          resultPriceSelector,
          resultThumbnailSelector,
          resultLinkSelector
        );
  
        products = [...products, ...[product] || []]
      }
    }

    if (!count && isSingle) {
      const title = await page.$eval(productTitle, el => el.textContent)
      const price = await page.$eval(productPrice, el => el.textContent)
      const thumbnail = await page.$eval(productThumbnail, el => el.getAttribute('src'))
      const link = await page.$eval('body', () => window.location.href)

      if (title && price && thumbnail && link) {
        products.push({
          title,
          price,
          thumbnail,
          link
        })
      }
    }

    return products
      .filter(product => product)
      .map(product => (product && {
        ...product,
        store: config.name,
        title: product.title.trim(),
        price: currency(product.price.trim()).value,
        link: product.link!.startsWith('/') ? `${config.origin}${product.link}` : product.link,
        thumbnail: product.thumbnail!.startsWith('/') ? `${config.origin}${product.thumbnail}` : product.thumbnail
      }))
  };


  const res = await Promise.all(storesConfig.map(async (config) => {
    const page = await browser.newPage();
    let result = null
    try {
      result = await task({ page, data: config});
    } catch (error) {
      console.warn(error)
    }
    results = [...results, ...result || []]
    return result
  }))

  await fetch(`https://chrome.browserless.io/kill/all?token=${BROWSERLESS_API_KEY}`)

  if (!results.length) return []
  const titles = results.map(item => item.title.toLowerCase());
  const productsSimilarity = stringSimilarity.findBestMatch(
    query.toLocaleLowerCase(), 
    titles
  )
  return productsSimilarity.ratings
    .map(item => ({ ...results[titles.indexOf(item.target)], rating: item.rating }))
    // Sort by price by default
    .sort((a, b) => a.price - b.price);
}