import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { Consumer } from "../model/consumer";
import {
  fetchConsumersError,
  fetchConsumersSuccess,
  removeConsumer,
  setConsumer,
  setSelectedConsumer,
} from "./consumer.reducer";
import { RootState } from "./store";

const loadConsumersFromLocalStorage = (): Consumer[] => {
  const savedConsumers = localStorage.getItem("consumers");
  return savedConsumers ? JSON.parse(savedConsumers) : [];
};

export const fetchConsumers =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      const consumers = loadConsumersFromLocalStorage();
      dispatch(fetchConsumersSuccess(consumers));
    } catch (e) {
      dispatch(fetchConsumersError("Failed to load consumers" + e));
    }
  };

// Thunk para adicionar um consumidor
export const setConsumerAsync =
  (consumer: Consumer): ThunkAction<void, RootState, unknown, Action<string>> =>
  (dispatch) => {
    dispatch(setConsumer(consumer));
  };

// Thunk para remover um consumidor
export const removeConsumerAsync =
  (id: number): ThunkAction<void, RootState, unknown, Action<string>> =>
  (dispatch) => {
    dispatch(removeConsumer(id));
  };

// Thunk para buscar um consumidor por ID
export const fetchConsumerById =
  (id: number): ThunkAction<void, RootState, unknown, Action<string>> =>
  (dispatch, getState) => {
    const state = getState();
    const consumer = state.consumers.consumers.find((c) => c.id === id) || null;
    console.log("consumer", consumer);

    dispatch(setSelectedConsumer(consumer));
  };
