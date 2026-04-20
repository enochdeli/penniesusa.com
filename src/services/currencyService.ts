import { ExchangeRates } from '../types';

const API_URL = 'https://open.er-api.com/v6/latest/USD';

export interface ExchangeData {
  rates: ExchangeRates;
  lastUpdated: string;
}

let cachedRates: ExchangeData | null = null;

export async function fetchExchangeRates(): Promise<ExchangeData | null> {
  if (cachedRates) return cachedRates;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second timeout

  try {
    const response = await fetch(API_URL, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch exchange rates: ${response.status}`);
    }
    const data = await response.json();
    cachedRates = {
      rates: data.rates,
      lastUpdated: data.time_last_update_utc || new Date().toUTCString()
    };
    return cachedRates;
  } catch (error: any) {
    clearTimeout(timeoutId);
    console.error('Error fetching exchange rates:', error);
    return null;
  }
}
