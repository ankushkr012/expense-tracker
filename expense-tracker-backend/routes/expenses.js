const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const authenticateToken = require('../middleware/authenticateToken');

// ✅ Add a new expense
router.post('/add', authenticateToken, async (req, res) => {
  try {
    const { title, payMode, amount, status, date } = req.body;

    if (!title || !amount || !status || !date || !payMode) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    const newExpense = new Expense({
      title,
      payMode,
      amount,
      status,
      date,
      userId: req.user.id,
    });

    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    console.error('Expense save error:', err);
    res.status(500).json({ message: 'Server Error. Could not add expense.' });
  }
});

// ✅ Get all expenses for the logged-in user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    console.error('Fetch expenses error:', err);
    res.status(500).json({ message: 'Server Error. Could not fetch expenses.' });
  }
});


// ✅ Update an existing expense
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, userId: req.user.id });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    const { title, payMode, amount, status, date } = req.body;
    expense.title = title || expense.title;
    expense.payMode = payMode || expense.payMode;
    expense.amount = amount || expense.amount;
    expense.status = status || expense.status;
    expense.date = date || expense.date;

    const updatedExpense = await expense.save();
    res.status(200).json(updatedExpense);
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Server Error. Could not update expense.' });
  }
});

// ✅ Delete an expense
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Server Error. Could not delete expense.' });
  }
});

module.exports = router;
