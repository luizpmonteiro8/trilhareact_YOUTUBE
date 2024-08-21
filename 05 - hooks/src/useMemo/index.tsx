import { useMemo, useState } from "react";

interface Item {
  value: number;
}

function ExpensiveComponent({ items }: { items: Item[] }) {
  const expensiveCalculation = (items: Item[]) => {
    console.log("Função sendo executada...");
    return items.reduce((sum, item) => sum + item.value, 0);
  };

  const total = useMemo(() => expensiveCalculation(items), [items]);

  return <div>Total: {total}</div>;
}

export default function UseMemoHook() {
  const [count, setCount] = useState(0);
  const items = useMemo(
    () => [
      { value: 10 },
      { value: 20 },
      { value: 30 },
      { value: 40 },
      { value: 50 },
    ],
    []
  );

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Re-render</button>
      <p>Count: {count}</p>
      <ExpensiveComponent items={items} />
    </div>
  );
}
