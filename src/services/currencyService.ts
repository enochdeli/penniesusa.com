import { ExchangeRates } from '../types';

const API_URL = 'https://open.er-api.com/v6/latest/USD';

export async function fetchExchangeRates(): Promise<ExchangeRates | null> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }
    const data = await response.json();
    return data.rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return null;
  }
}
