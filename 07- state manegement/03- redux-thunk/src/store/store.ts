import { configureStore } from "@reduxjs/toolkit";
import consumerReducer from "./consumer.reducer";

//npm install redux react-redux @reduxjs/toolkit
export const store = configureStore({
  reducer: {
    consumers: consumerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
