import { useState } from 'react';
import CurrencyType from '../enums/CurrencyType';

const BASE_URL = `https://api.exchangeratesapi.io`;

interface FXResponse {
  rates: {
    [key: string]: string;
  };
  base: string;
}

export interface FXResult {
  from: CurrencyType;
  to: CurrencyType;
  rate: number;
}

export const useFXApiHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [result, setResult] = useState<FXResult>();

  return {
    error,
    result,
    isLoading,
    getFXRate: (from: CurrencyType, to: CurrencyType) => {
      setIsLoading(true);
      return fetch(`${BASE_URL}/latest?base=${from}&symbols=${to}`)
        .then(response => response.json())
        .then((fxData: FXResponse) => {
          const conversionRate = +fxData.rates[to];
          setResult({
            from: from,
            to: to,
            rate: conversionRate,
          });
        })
        .catch(e => setError(e))
        .finally(() => setIsLoading(false));
    },
    getFXValue: (conversionRate: FXResult, from: number, doReverse = false) => {
      const convertedValue = !doReverse
        ? (from / 100) * conversionRate.rate
        : from / 100 / conversionRate.rate;
      return +(+convertedValue.toFixed(2) * 100).toFixed(2);
    },
  };
};
