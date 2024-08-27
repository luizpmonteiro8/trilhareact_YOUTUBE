import { makeAutoObservable } from "mobx";
import { Consumer } from "./model/consumer";

//npm install mobx mobx-react mobx-react-lite
export class ConsumerStore {
  consumers: Consumer[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadConsumers();
  }

  loadConsumers() {
    const savedConsumers = localStorage.getItem("consumers");
    this.consumers = savedConsumers ? JSON.parse(savedConsumers) : [];
  }

  saveConsumers() {
    localStorage.setItem("consumers", JSON.stringify(this.consumers));
  }

  setConsumer(newConsumer: Consumer) {
    const existingConsumerIndex = this.consumers.findIndex(
      (c) => c.id === newConsumer.id
    );
    if (existingConsumerIndex !== -1) {
      this.consumers[existingConsumerIndex] = newConsumer;
    } else {
      this.consumers.push({ ...newConsumer, id: this.consumers.length + 1 });
    }
    this.saveConsumers();
  }

  removeConsumer(id: number) {
    this.loadConsumers();
    this.consumers = this.consumers.filter((consumer) => consumer.id !== id);
    this.saveConsumers();
  }

  getConsumerById(id: number): Consumer | undefined {
    return this.consumers.find((consumer) => consumer.id === id);
  }
}

export const consumerStore = new ConsumerStore();
