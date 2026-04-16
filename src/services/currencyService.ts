import { ExchangeRates } from '../types';

const API_URL = 'https://open.er-api.com/v6/latest/USD';

export interface ExchangeData {
  rates: ExchangeRates;
  lastUpdated: string;
}

export async function fetchExchangeRates(): Promise<ExchangeData | null> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }
    const data = await response.json();
    return {
      rates: data.rates,
      lastUpdated: data.time_last_update_utc || new Date().toUTCString()
    };
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return null;
  }
}
