import { getCurrencyRate } from "~~/server/services/currency.service";
import { getCurrentWeaher } from "~~/server/services/weather.service";
import { postMessage } from "~~/server/services/viberbot.service";

export default defineEventHandler(async (event) => {
  if (event.node.req.method === 'GET') {
    const weather = await getCurrentWeaher()
    const currency = await getCurrencyRate()
    const message = `Температура повітря: ${weather.current_weather.temperature}° \nКурс USD: ${currency[0].rate}`

    return postMessage(message)
  }
});