import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTransactions,
  setChartData,
  addTransaction,
} from "../features/transactions/transactionsSlice";

const TransactionPage = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.transactions);
  const chartData = useSelector((state) => state.transactions.chartData);

  const [formData, setFormData] = useState({
    amount: 0,
    type: "income",
    category: "",
    description: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      amount: formData.amount,
      type: formData.type,
      category: formData.category,
      description: formData.description,
    };
  
    try {
      // Include token verification if needed
      const verified = await axios.post("http://localhost:3000/auth/users/verify", {}, { withCredentials: true });
  
      // Get the token from the response
      const token = verified.data.token;
  
      // Add the token to the headers of the POST request
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await axios.post("http://localhost:3000/transactions", payload, config);
      const newTransaction = response.data;
      console.log(response.data)
  
      dispatch(addTransaction(newTransaction));
  
      const newData = {
        totalIncome: chartData.totalIncome + (newTransaction.type === "income" ? newTransaction.amount : 0),
        totalExpense: chartData.totalExpense + (newTransaction.type === "expense" ? newTransaction.amount : 0),
        totalInvestment: chartData.totalInvestment + (newTransaction.type === "investment" ? newTransaction.amount : 0),
        totalAmount: chartData.totalAmount + newTransaction.amount,
      };
  
      dispatch(setChartData(newData));
  
      setFormData({
        amount: 0,
        type: "income",
        category: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding transaction:", error);
      console.log(error)
    }
  };
  
  useEffect(() => {
    // Fetch transactions and chart data from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/transactions", { withCredentials: true });
        dispatch(setTransactions(response.data));

        const totalIncome = response.data
          .filter((transaction) => transaction.type === "income")
          .reduce((sum, transaction) => sum + transaction.amount, 0);

        const totalExpense = response.data
          .filter((transaction) => transaction.type === "expense")
          .reduce((sum, transaction) => sum + transaction.amount, 0);

        const totalInvestment = response.data
          .filter((transaction) => transaction.type === "investment")
          .reduce((sum, transaction) => sum + transaction.amount, 0);

        const totalAmount = totalIncome + totalExpense + totalInvestment;

        dispatch(
          setChartData({
            totalIncome,
            totalExpense,
            totalInvestment,
            totalAmount,
          })
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);
  return (
    <div className="container mx-auto my-8 p-8 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Transaction Page</h1>
      {/* Transaction Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
            <option value="investment">Investment</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Add Transaction
        </button>
      </form>

      {/* Transaction List */}
      <h2 className="text-lg font-bold mb-2">Transactions:</h2>
      <ul>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <li key={transaction._id} className="mb-2">
              {transaction.type} - {transaction.amount} - {transaction.category}
            </li>
          ))
        ) : (
          <p>No transactions available.</p>
        )}
      </ul>

      {/* Custom Pie Chart using React and Tailwind CSS */}
      {Object.keys(chartData).length > 0 ? (
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-2">Transaction Chart:</h2>
          <div className="relative w-32 h-32">
            <div
              className="absolute w-full h-full bg-green-500 rounded-full"
              style={{ transform: `rotate(${(chartData.totalIncome / chartData.totalAmount) * 360}deg)` }}
            ></div>
            <div
              className="absolute w-full h-full bg-red-500 rounded-full"
              style={{ transform: `rotate(${(chartData.totalExpense / chartData.totalAmount) * 360}deg)` }}
            ></div>
            <div
              className="absolute w-full h-full bg-blue-500 rounded-full"
              style={{ transform: `rotate(${(chartData.totalInvestment / chartData.totalAmount) * 360}deg)` }}
            ></div>
          </div>
        </div>
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default TransactionPage;