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

export interface UserPreferences {
  userId: string;
  email: string;
  baseCurrency?: string;
  netWorth?: number;
  searchHistory?: string[];
  isAdmin?: boolean;
  updatedAt?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  takeaways?: string[];
  content: string;
  coverImageUrl?: string;
  authorId: string;
  authorName: string;
  tags?: string[];
  published: boolean;
  createdAt: string;
  updatedAt?: string;
}
