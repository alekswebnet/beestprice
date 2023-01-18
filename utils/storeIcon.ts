import { Store } from "../types";

const storesIcons: Record<keyof typeof Store, string> = {
  BudynokIgrashok: '/img/bi-logo.svg',
  Foxtrot: '/img/foxtrot.png',
  Rozetka: '/img/rozetka-logo.svg',
  Comfy: '/img/comfy.svg',
  Panama: '/img/panama.svg',
  Olx: '/img/olx.png',
  Prom: '/img/prom.png',
  FUa: '/img/fua.svg',
  Maudau: '/img/maudau.svg'
};

export const getStoreIcon = (store: keyof typeof Store): string => {
  return storesIcons[store] || ''
}