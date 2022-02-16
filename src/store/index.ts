import { configureStore } from "@reduxjs/toolkit";
import { jobcoinApi } from "../features/Jobcoin/jobcoinSlice";

export const store = configureStore({
  reducer: {
    [jobcoinApi.reducerPath]: jobcoinApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobcoinApi.middleware),
});
