const db = require("../config/db");

exports.getMonthlySummary = async () => {
  const result = await db.query(`
    SELECT
      DATE_TRUNC('month', created_at) AS month,
      SUM(amount) AS total
    FROM expenses
    GROUP BY month
    ORDER BY month
  `);

  return result.rows;
};
