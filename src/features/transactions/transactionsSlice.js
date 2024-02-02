// transactionsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: [],
    chartData: {},
  },
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    addTransaction: (state, action) => {
      const newTransaction = action.payload;
      state.transactions.push(newTransaction);

      switch (newTransaction.type) {
        case "income":
          state.chartData.totalIncome += newTransaction.amount;
          break;
        case "expense":
          state.chartData.totalExpense += newTransaction.amount;
          break;
        case "investment":
          state.chartData.totalInvestment += newTransaction.amount;
          break;
        default:
          break;
      }

      state.chartData.totalAmount += newTransaction.amount;
    },
    setChartData: (state, action) => {
      state.chartData = action.payload;
    },
  },
});

export const { setTransactions, addTransaction, setChartData } =
  transactionsSlice.actions;

export const selectTransactions = (state) => state.transactions.transactions;
export const selectChartData = (state) => state.transactions.chartData;

export default transactionsSlice.reducer;
