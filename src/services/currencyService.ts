import { ExchangeRates } from '../types';

const API_URL = 'https://open.er-api.com/v6/latest/USD';

export interface ExchangeData {
  rates: ExchangeRates;
  lastUpdated: string;
}

export async function fetchExchangeRates(): Promise<ExchangeData | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second timeout

  try {
    const response = await fetch(API_URL, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch exchange rates: ${response.status}`);
    }
    const data = await response.json();
    return {
      rates: data.rates,
      lastUpdated: data.time_last_update_utc || new Date().toUTCString()
    };
  } catch (error: any) {
    clearTimeout(timeoutId);
    console.error('Error fetching exchange rates:', error);
    return null;
  }
}
