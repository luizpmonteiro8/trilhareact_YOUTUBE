import { useEffect, useState } from "react";

interface OrderDetails {
  quantity: number;
  price: number;
}

function CallbackComponent({
  id,
  handleSubmit,
}: {
  id: number;
  handleSubmit: (orderDetails: OrderDetails) => void;
}) {
  const orderDetails = { quantity: 1, price: 100 };

  useEffect(() => {
    console.log("recriou handleSubmit sem useCallback");
  }, [handleSubmit]); // Log quando handleSubmit muda

  return (
    <div>
      <button onClick={() => handleSubmit(orderDetails)}>Submit Order</button>
      <p>Product ID: {id}</p>
    </div>
  );
}

export default function UseCallbackNoHook() {
  const [count, setCount] = useState(0);
  const [id, setId] = useState(0);

  // Função de envio sem useCallback
  const handleSubmit = (orderDetails: { quantity: number; price: number }) => {
    console.log("Posting to /product/" + id + "/buy", {
      orderDetails,
    });
  };

  useEffect(() => {
    console.log("UseCallbackHook rendered");
  }, [count, id]); // Log quando count ou id mudam

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Re-render</button>
      <p>Count: {count}</p>
      <button onClick={() => setId(id + 1)}>Change ID</button>
      <CallbackComponent id={id} handleSubmit={handleSubmit} />
    </div>
  );
}
