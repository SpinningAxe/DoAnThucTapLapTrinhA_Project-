import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./slices/bookSlice"
import accountSlice from "./slices/accountSlice"

export const store = configureStore({
  reducer: {
    account: accountSlice,
    books: bookSlice,
  },
});