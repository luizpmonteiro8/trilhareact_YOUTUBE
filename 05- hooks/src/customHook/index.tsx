import { useCounter } from "./useCounter";

export default function UseCustomCounter() {
  const { count, increment, decrement, reset } = useCounter(0);
  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
