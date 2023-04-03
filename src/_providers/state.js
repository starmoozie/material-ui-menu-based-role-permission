import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../_reducers";

export const stateProvider = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
