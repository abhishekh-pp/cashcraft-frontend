// transactionsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
};

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
    },
    removeTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        (transaction) => transaction._id !== action.payload
      );
    },
    // transactionsSlice.js
    updateTransaction: (state, action) => {
      console.log("Updating transaction:", action.payload);
      const updatedIndex = state.transactions.findIndex(
        (transaction) => transaction._id === action.payload._id
      );
      if (updatedIndex !== -1) {
        state.transactions[updatedIndex] = action.payload;
      }
      console.log("Updated state:", state.transactions);
    },
  },
});

export const {
  setTransactions,
  addTransaction,
  removeTransaction,
  updateTransaction,
} = transactionsSlice.actions;

export const selectTransactions = (state) => state.transactions.transactions;

export default transactionsSlice.reducer;
