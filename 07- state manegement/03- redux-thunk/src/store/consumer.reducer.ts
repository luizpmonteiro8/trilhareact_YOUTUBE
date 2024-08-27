import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Consumer } from "../model/consumer";

interface ConsumerState {
  consumers: Consumer[];
  loading: boolean;
  error: string | null;
  selectedConsumer: Consumer | null;
}

const initialState: ConsumerState = {
  consumers: [],
  loading: false,
  error: null,
  selectedConsumer: null,
};

const consumerSlice = createSlice({
  name: "consumer",
  initialState,
  reducers: {
    setConsumer(state, action: PayloadAction<Consumer>) {
      const newConsumer = action.payload;
      const existingConsumerIndex = state.consumers.findIndex(
        (c) => c.id === newConsumer.id
      );
      if (existingConsumerIndex !== -1) {
        state.consumers[existingConsumerIndex] = newConsumer;
      } else {
        state.consumers.push({
          ...newConsumer,
          id: state.consumers.length + 1,
        });
      }
      localStorage.setItem("consumers", JSON.stringify(state.consumers));
    },
    removeConsumer(state, action: PayloadAction<number>) {
      state.consumers = state.consumers.filter(
        (consumer) => consumer.id !== action.payload
      );
      localStorage.setItem("consumers", JSON.stringify(state.consumers));
    },
    fetchConsumersSuccess(state, action: PayloadAction<Consumer[]>) {
      state.consumers = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchConsumersError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    setSelectedConsumer(state, action: PayloadAction<Consumer | null>) {
      state.selectedConsumer = action.payload;
    },
  },
});

export const {
  setConsumer,
  removeConsumer,
  fetchConsumersSuccess,
  fetchConsumersError,
  setSelectedConsumer,
} = consumerSlice.actions;
export default consumerSlice.reducer;
