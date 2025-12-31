exports.calculateNetBalances = (expenses) => {
  const balance = {};

  expenses.forEach(exp => {
    const { paid_by, amount, splits } = exp;

    // Person who paid gets credited
    balance[paid_by] = (balance[paid_by] || 0) + Number(amount);

    // Everyone owes their share
    splits.forEach(s => {
      balance[s.user_id] =
        (balance[s.user_id] || 0) - Number(s.share);
    });
  });

  return balance;
};
