import { configureStore } from "@reduxjs/toolkit";
import inputStatusSlice from "./reducer/InputStatusSlice";
import { logger } from "redux-logger";

export const store = configureStore({
  reducer: {
    inputStatus: inputStatusSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
