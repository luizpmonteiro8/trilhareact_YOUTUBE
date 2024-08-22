import React, { createContext, ReactNode, useContext, useState } from "react";
import { Consumer } from "./model/consumer";

interface ConsumerContextType {
  consumers: Consumer[];
  setConsumer: (consumer: Consumer) => void;
  removeConsumer: (id: number) => void;
  getConsumerById: (id: number) => Consumer | undefined;
}

const ConsumerContext = createContext<ConsumerContextType | undefined>(
  undefined
);

export const ConsumerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [consumers, setConsumers] = useState<Consumer[]>([
    {
      id: 1,
      name: "John Doe",
      email: "dRQp5@example.com",
      password: "123456",
      telephone: "123456789",
      knowReact: true,
      referer: [{ id: 1, name: "Jane Doe", telephone: "987654321" }],
    },
  ]);

  const setConsumer = (newConsumer: Consumer) => {
    setConsumers((prev) =>
      prev.some((c) => c.id === newConsumer.id)
        ? prev.map((c) => (c.id === newConsumer.id ? newConsumer : c))
        : [...prev, { ...newConsumer, id: prev.length + 1 }]
    );
  };

  const removeConsumer = (id: number) => {
    setConsumers((prev) => prev.filter((consumer) => consumer.id !== id));
  };

  const getConsumerById = (id: number): Consumer | undefined => {
    return consumers.find((consumer) => consumer.id === id);
  };

  return (
    <ConsumerContext.Provider
      value={{ consumers, setConsumer, removeConsumer, getConsumerById }}
    >
      {children}
    </ConsumerContext.Provider>
  );
};

export const useConsumer = (): ConsumerContextType => {
  const context = useContext(ConsumerContext);
  if (!context) {
    throw new Error("useConsumer deve ser usado dentro do ConsumerProvider");
  }
  return context;
};
