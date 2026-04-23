export interface CountryData {
  id: string;
  name: string;
  code: string;
  costLivingIndex: number;
  rentIndex: number;
  groceriesIndex: number;
  restaurantIndex: number;
  localPurchasingPowerIndex: number;
  currency: string;
  currencySymbol: string;
  exchangeRate: number; // 1 USD to [Currency]
  lat: number;
  lng: number;
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
  slug: string;
}

export interface UserWealthInfo {
  netWorth: number;
  annualIncome: number;
  currency: string;
}
