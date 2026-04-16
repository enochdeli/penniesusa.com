export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  country: string;
  iso: string; // ISO 3166-1 alpha-2 code for flags
}

export interface ExchangeRates {
  [key: string]: number;
}

export interface MillionaireResult {
  currency: Currency;
  localAmount: number;
  isMillionaire: boolean;
  valueForOneMillion: number; // How much of the user's base currency is 1M local
}
