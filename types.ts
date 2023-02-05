export enum Store {
  BudynokIgrashok = 'BudynokIgrashok',
  Foxtrot = 'Foxtrot',
  Rozetka = 'Rozetka',
  Comfy = 'Comfy',
  Panama = 'Panama',
  Olx = 'Olx',
  Prom = 'Prom',
  FUa = 'FUa',
  Maudau = 'Maudau',
  Moyo = 'Moyo'
}

export interface IStoreConfig {
  name: keyof typeof Store,
  origin: string,
  searchPrefix: (query: string) => string;
  selectors: {
    search: {
      results: {
        container: string,
        item: string,
        title: string,
        price: string,
        link: string,
        thumbnail: string
      }
    },
    product: {
      title: string,
      price: string,
      thumbnail: string
    }
  }
}

export interface IProduct {
  title: string;
  price: number;
  link: string;
  store: keyof typeof Store;
  thumbnail: string;
}