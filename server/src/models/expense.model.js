const db = require("../config/db");

exports.createExpense = async ({ description, amount, paidBy, splits }) => {
  // Insert into expenses table
  const expenseRes = await db.query(
    `INSERT INTO expenses (description, amount, paid_by)
     VALUES ($1, $2, $3)
     RETURNING id`,
    [description, amount, paidBy]
  );

  const expenseId = expenseRes.rows[0].id;

  // Insert participants & their shares
  for (let s of splits) {
    await db.query(
      `INSERT INTO expense_participants (expense_id, user_id, share)
       VALUES ($1, $2, $3)`,
      [expenseId, s.userId, s.share]
    );
  }

  return expenseId;
};
exports.getAllExpenses = async () => {
  const result = await db.query(`
    SELECT 
      e.id,
      e.description,
      e.amount,
      e.created_at,
      u.name AS paid_by
    FROM expenses e
    JOIN users u ON e.paid_by = u.id
    ORDER BY e.created_at DESC
  `);

  return result.rows;
};
exports.getExpensesWithSplits = async () => {
  const expensesRes = await db.query(`
    SELECT 
      e.id, e.description, e.amount,
      u.id AS paid_by_id,
      u.name AS paid_by
    FROM expenses e
    JOIN users u ON e.paid_by = u.id
    ORDER BY e.created_at DESC
  `);

  const expenses = expensesRes.rows;

  for (let exp of expenses) {
    const splitsRes = await db.query(`
      SELECT ep.user_id, ep.share
      FROM expense_participants ep
      WHERE ep.expense_id = $1
    `, [exp.id]);

    exp.splits = splitsRes.rows;
  }

  return expenses;
};
