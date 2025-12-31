exports.calculateSettlements = (expenses, usersMap) => {
  const balance = {};

  // Calculate net balance for each user
  expenses.forEach(exp => {
    // Add paid amount
    balance[exp.paid_by_id] =
      (balance[exp.paid_by_id] || 0) + Number(exp.amount);

    // Subtract shares
    exp.splits.forEach(s => {
      balance[s.user_id] =
        (balance[s.user_id] || 0) - Number(s.share);
    });
  });

  const creditors = [];
  const debtors = [];

  // Separate creditors and debtors
  Object.entries(balance).forEach(([userId, amt]) => {
    if (amt > 0) creditors.push({ userId, amt });
    if (amt < 0) debtors.push({ userId, amt: -amt });
  });

  const settlements = [];
  let i = 0;
  let j = 0;

  // Greedy settlement algorithm
  while (i < debtors.length && j < creditors.length) {
    const pay = Math.min(debtors[i].amt, creditors[j].amt);

    settlements.push({
      from: usersMap[debtors[i].userId],
      to: usersMap[creditors[j].userId],
      amount: pay
    });

    debtors[i].amt -= pay;
    creditors[j].amt -= pay;

    if (debtors[i].amt === 0) i++;
    if (creditors[j].amt === 0) j++;
  }

  return settlements;
};
