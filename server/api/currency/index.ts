import { getCurrencyRate } from "~~/server/services/currency.service";

export default defineEventHandler(async (event) => {
  const code = getQuery(event).code
  if (event.node.req.method === 'GET') {
    return await getCurrencyRate(code as string)
  }
});