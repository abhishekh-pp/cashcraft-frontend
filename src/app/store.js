import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import transactionsReducer from "../features/transactions/transactionsSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionsReducer,
  },
});
