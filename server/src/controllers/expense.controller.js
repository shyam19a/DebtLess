const Expense = require("../models/expense.model");
const SettlementService = require("../services/settlement.service");
const User = require("../models/user.model");

// Add new expense
exports.addExpense = async (req, res) => {
  try {
    const expenseId = await Expense.createExpense(req.body);
    res.status(201).json({ expenseId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get paid activity list
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.getAllExpenses();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get overview (paid activity + who owes whom)
exports.getOverview = async (req, res) => {
  try {
    // 1️⃣ Get expenses with splits
    const expenses = await Expense.getExpensesWithSplits();

    // 2️⃣ Get all users
    const users = await User.getAllUsers();

    // 3️⃣ Build userId -> userName map
    const usersMap = {};
    users.forEach(u => {
      usersMap[u.id] = u.name;
    });

    // 4️⃣ Calculate settlements with names
    const settlements =
      SettlementService.calculateSettlements(expenses, usersMap);

    // 5️⃣ Return combined response
    res.json({
      expenses,
      settlements
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.settleUp = async (req, res) => {
  try {
    const db = require("../config/db");

    await db.query("DELETE FROM expense_participants");
    await db.query("DELETE FROM expenses");

    res.json({ message: "Settled up successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
