const express = require("express");
const cors = require("cors");

const expenseRoutes = require("./routes/expense.routes");
const summaryRoutes = require("./routes/summary.routes");
const userRoutes = require("./routes/user.routes");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/expenses", expenseRoutes);
app.use("/api/expenses", summaryRoutes);
app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

module.exports = app;
