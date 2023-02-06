import { getProductList } from "~~/server/services/products.service";
import { Store } from "~~/types";

export default defineEventHandler(async (event) => {
  const query = getQuery(event).qr || ''
  const stores = getQuery(event).stores || ''
  
  if (query && event.node.req.method === 'GET') {
    return await getProductList(query as string, stores as (keyof typeof Store)[]);
  }
});