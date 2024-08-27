import { create } from "zustand";
import { Consumer } from "./model/consumer";

//npm install zustand
const loadConsumers = (): Consumer[] => {
  const savedConsumers = localStorage.getItem("consumers");
  return savedConsumers ? JSON.parse(savedConsumers) : [];
};

const saveConsumers = (consumers: Consumer[]) => {
  localStorage.setItem("consumers", JSON.stringify(consumers));
};

interface ConsumerState {
  consumers: Consumer[];
  setConsumer: (consumer: Consumer) => void;
  removeConsumer: (id: number) => void;
  getConsumerById: (id: number) => Consumer | undefined;
}

export const useConsumerStore = create<ConsumerState>((set, get) => ({
  consumers: loadConsumers(),
  setConsumer: (newConsumer: Consumer) => {
    set((state) => {
      const updatedConsumers = state.consumers.some(
        (c) => c.id === newConsumer.id
      )
        ? state.consumers.map((c) =>
            c.id === newConsumer.id ? newConsumer : c
          )
        : [
            ...state.consumers,
            { ...newConsumer, id: state.consumers.length + 1 },
          ];
      saveConsumers(updatedConsumers);
      return { consumers: updatedConsumers };
    });
  },
  removeConsumer: (id: number) => {
    set((state) => {
      const updatedConsumers = state.consumers.filter(
        (consumer) => consumer.id !== id
      );
      saveConsumers(updatedConsumers);
      return { consumers: updatedConsumers };
    });
  },
  getConsumerById: (id: number): Consumer | undefined => {
    return get().consumers.find((consumer) => consumer.id === id);
  },
}));
