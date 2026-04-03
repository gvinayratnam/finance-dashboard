export const calculateSummary = (transactions) => {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return { totalIncome, totalExpense, balance };
};

export const filterTransactions = (transactions, search, category, type) => {
  return transactions.filter((item) => {
    return (
      item.title.toLowerCase().startsWith(search.toLowerCase()) &&
      (category === "" || item.category === category) &&
      (type === "" || item.type === type)
    );
  });
};