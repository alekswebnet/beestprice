import { getCurrentWeaher } from "~~/server/services/weather.service";

export default defineEventHandler(async (event) => {
  if (event.node.req.method === 'GET') {
    return await getCurrentWeaher()
  }
});