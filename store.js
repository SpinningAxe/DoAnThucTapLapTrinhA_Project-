import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./slices/bookSlice";
import accountSlice from "./slices/accountSlice";
import creationSlice from "./slices/creationSlice";
import notificationSlice from "./slices/notificationSlice";

export const store = configureStore({
  reducer: {
    account: accountSlice,
    books: bookSlice,
    creation: creationSlice,
    notification: notificationSlice,
  },
});