import { useCallback, useState } from "react";

interface UseCounter {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export function useCounter(initialValue: number = 0): UseCounter {
  const [count, setCount] = useState<number>(initialValue);

  const increment = useCallback(
    () => setCount((prevCount) => prevCount + 1),
    []
  );
  const decrement = useCallback(
    () => setCount((prevCount) => prevCount - 1),
    []
  );
  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  return { count, increment, decrement, reset };
}
