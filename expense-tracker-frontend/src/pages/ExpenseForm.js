import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileAlt, FaMoneyBill, FaWallet, FaCheckCircle, FaCalendarAlt } from 'react-icons/fa'; // ✅ icons
import '../styles/ExpenseForm.css';
import API from '../api';

const ExpenseForm = () => {
  const [expense, setExpense] = useState({
    title: '',
    payMode: 'Cash',
    amount: '',
    status: 'Paid',
    date: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setExpense((prev) => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!user || !token) {
      alert('User not logged in');
      return;
    }

    const payload = {
      ...expense,
      userId: user._id,
    };

    try {
      const res = await API.post(
        '/api/expenses/add',
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 201) {
        navigate('/list');
      }
    } catch (err) {
      console.error('Error saving expense:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Expense save failed');
    }
  };

  return (
    <div className="expense-form-container">
      <form className="expense-form" onSubmit={handleSubmit}>
        <h2>Add New Expense</h2>

        <div className="form-row">

          {/* Title */}
          <div className="input-icon">
            <FaFileAlt className="icon" />
            <input
              name="title"
              placeholder="Title"
              required
              value={expense.title}
              onChange={handleChange}
            />
          </div>

          {/* Pay Mode */}
          <div className="input-icon">
            <FaWallet className="icon" />
            <select name="payMode" value={expense.payMode} onChange={handleChange}>
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
              <option value="Card">Card</option>
            </select>
          </div>

          {/* Amount */}
          <div className="input-icon">
            <FaMoneyBill className="icon" />
            <input
              name="amount"
              type="number"
              placeholder="₹ Amount"
              required
              value={expense.amount}
              onChange={handleChange}
            />
          </div>

          {/* Status */}
          <div className="input-icon">
            <FaCheckCircle className="icon" />
            <select name="status" value={expense.status} onChange={handleChange}>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          {/* Date */}
          <div className="input-icon">
            <FaCalendarAlt className="icon" />
            <input
              name="date"
              type="date"
              required
              value={expense.date}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="button-wrapper">
          <button type="submit" className="submit-btn">Add Expense</button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
