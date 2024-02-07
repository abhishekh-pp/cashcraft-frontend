import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction, setTransactions, removeTransaction, updateTransaction, selectTransactions } from '../features/transactions/transactionsSlice';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { PieChart } from 'react-minimal-pie-chart';

const dbUrl = 'http://localhost:3000';

const TransactionPage = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactions);
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [editTransactionId, setEditTransactionId] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const verified = await axios.post(`${dbUrl}/auth/users/verify`, {}, { withCredentials: true });
      const transData = await axios.get(`${dbUrl}/transactions/transactions`, { withCredentials: true });
      const trans = transData.data;
      dispatch(setTransactions(trans));
    } catch (err) {
      console.log(err);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const payload = {
      amount: form['amount'].value,
      type: form['type'].value,
      category: form['category'].value,
      description: form['description'].value,
    };

    if (editTransactionId) {
      axios.put(`${dbUrl}/transactions/${editTransactionId}`, payload, { withCredentials: true })
        .then(data => {
          const updatedTrans = data.data;
          dispatch(updateTransaction(updatedTrans));
          setEditTransactionId(null);
          window.location.reload()
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      axios.post(`${dbUrl}/transactions/transactions`, payload, { withCredentials: true })
        .then(data => {
          const newTrans = data.data;
          dispatch(addTransaction(newTrans));
        })
        .catch(err => {
          console.log(err);
        });
    }
    setAmount('');
    setType('income');
    setCategory('');
    setDescription('');
  }

  const handleDelete = async (transactionId) => {
    try {
      await axios.delete(`${dbUrl}/transactions/${transactionId}`, { withCredentials: true });
      dispatch(removeTransaction(transactionId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (transactionId) => {
    const transactionToEdit = transactions.find((transaction) => transaction._id === transactionId);

    setAmount(transactionToEdit.amount);
    setType(transactionToEdit.type);
    setCategory(transactionToEdit.category);
    setDescription(transactionToEdit.description);

    setEditTransactionId(transactionId);
  };

  // Calculate total amount for each category
  const incomeAmount = transactions
    .filter(transaction => transaction.type === 'income')
    .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);

  const expenseAmount = transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);

  const investmentAmount = transactions
    .filter(transaction => transaction.type === 'investment')
    .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);

  const data = [
    { title: 'Income', value: incomeAmount, color: '#8569f1' },
    { title: 'Expense', value: expenseAmount, color: '#658ff1' },
    { title: 'Investment', value: investmentAmount, color: '#a465f1' },
  ];

  // Filter out categories with zero amount
  const filteredData = data.filter(item => item.value !== 0);

  return (
    <div className="container  mt-8">
      <div className="lg:mx-48 mx-8 lg:flex justify-between">
        <form onSubmit={handleSubmit} className="max-w-md w-full  lg:mr-8">
          <h1 className="text-2xl font-bold mb-4">Add New Transaction</h1>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-600">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-medium text-gray-600">
              Type
            </label>
            <select
              id="type"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
              required
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
              <option value="investment">Investment</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-600">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <button type="submit" className="bg-[#002D74] rounded-xl text-white py-2 px-3 hover:scale-105 duration-300">
            {editTransactionId ? 'Update Transaction' : 'Add Transaction'}
          </button>
        </form>

        {filteredData.length > 0 && (
          <div className="mt-8 lg:mt-0 w-80 ">
            <PieChart
              data={filteredData}
              label={(data) => `${Math.round(data.dataEntry.percentage)}%`}
              labelStyle={{ fontSize: '5px', fill: '#fff' }}
              lengthAngle={360}
              animate={true}
              animationDuration={500}
              center={[50, 50]}
            />
          </div>
        )}
      </div>

      <div className='lg:mx-40 lg:my-12 mx-8'>
        <h2 className="text-xl font-bold mt-8 mb-4 ">Transactions</h2>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction._id} className="mb-2 p-4 border rounded-md">
              <strong>{transaction.amount}</strong> - {transaction.category} ({transaction.type})
              <button onClick={() => handleDelete(transaction._id)} className="ml-2 text-red-600">
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <button onClick={() => handleEdit(transaction._id)} className="ml-2 text-blue-600">
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransactionPage;
