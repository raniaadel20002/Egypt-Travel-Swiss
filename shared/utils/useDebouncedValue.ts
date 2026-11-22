import { useState, useEffect } from "react";

/**
 * Debounces a value, delaying updates until after a specified delay period.
 * Useful for search inputs to prevent excessive API calls.
 * 
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: 400ms)
 * @returns The debounced value
 */
export function useDebouncedValue<T>(value: T, delay: number = 400): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
