import { IProduct, IStoreConfig, Store } from '~~/types';
import { Cluster } from 'puppeteer-cluster';
import { getAllStoresConfig } from './stores.service';
import currency from 'currency.js';
import puppeteer, { Page } from 'puppeteer';
import { addExtra } from 'puppeteer-extra';
// import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import AdblockerPlugin  from 'puppeteer-extra-plugin-adblocker'
import * as stringSimilarity from 'string-similarity';
import chromium from '@sparticuz/chromium';

const puppeteerExtra = addExtra(puppeteer);
// const stealth = StealthPlugin();
// stealth.enabledEvasions.delete('user-agent-override');

puppeteerExtra.use(AdblockerPlugin({ blockTrackers: true }))

export const getProductList = async (
  query: string, 
  stores?: (keyof typeof Store)[]
) => {
  let results = [] as IProduct[];
  const storesConfig = getAllStoresConfig()
    .filter(config => stores && stores.length ? stores.includes(config.name) : true )

  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 10,
    puppeteer: puppeteerExtra,
    puppeteerOptions: {
      args: process.env.NODE_ENV === 'production' ? [...chromium.args, '--hide-scrollbars', '--disable-web-security'] : [],
      defaultViewport: process.env.NODE_ENV === 'production' ? chromium.defaultViewport : null,
      headless: process.env.NODE_ENV === 'production' ? chromium.headless : false,
      ignoreHTTPSErrors: true,
      executablePath: process.env.NODE_ENV === 'production'
        ? await chromium.executablePath(
          `https://github.com/Sparticuz/chromium/releases/download/v116.0.0/chromium-v116.0.0-pack.tar`
        )
        : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
      // args: ['--no-sandbox', '--disable-setuid-sandbox']
    },
    timeout: 30000
  });

  cluster.on('taskerror', (err, data) => {
    console.log(`Error crawling ${data}: ${err.message}`)
  });

  await cluster.task(async ({ page, data: config }: { page: Page, data: IStoreConfig }) => {
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

    await page.evaluate(async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: 'smooth' })
      await new Promise(resolve => setTimeout(resolve, 2000));
    });

    const count = await page.$$eval(resultsSelector, a => a.length)
    const isSingle = await page.$$eval(productTitle, a => a.length)

    console.warn(`Store: ${config.name}`, `Products: ${count}`, `Single product: ${isSingle}`)

    if (count) {
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
          const price = el[index].querySelector(resultPriceSelector)?.textContent?.split('+')[0]
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
  });

  try {
    await Promise.all(storesConfig.map(async (config) => {
      const result = await cluster.execute(config);
      results = [...results, ...result || []]
    }))
  } catch (err) {
    console.warn(err);
  }

  await cluster.idle();
  await cluster.close();

  if (!results.length) return []
  const titles = results.map(item => item.title.toLowerCase());
  const productsSimilarity = stringSimilarity.findBestMatch(
    query.toLocaleLowerCase(), 
    titles
  )
  return productsSimilarity.ratings
    .map(item => ({ ...results[titles.indexOf(item.target)], rating: item.rating }))
    .sort((a, b) => {          
      if (a.price > b.price) {
        return a.rating - a.rating;
      }
      return -1;
   });
}