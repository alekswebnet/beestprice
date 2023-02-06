export interface ICurrency {
  r030: number;
  txt: string;
  rate: number
  cc: string;
  exchangedate: string;
}

export const getCurrencyRate = (code = 'USD'): Promise<ICurrency[]> => {
  console.log(code)
  return fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${code}&json`)
    .then((res) => res.json())
}