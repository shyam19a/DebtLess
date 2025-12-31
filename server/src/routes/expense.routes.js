const router = require("express").Router();
const {
  addExpense,
  getExpenses,
  getOverview,
  settleUp
} = require("../controllers/expense.controller");

router.post("/", addExpense);
router.get("/", getExpenses);
router.get("/overview", getOverview);
router.post("/settle", settleUp);

module.exports = router;
