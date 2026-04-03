import { useMemo } from "react";

export const useChartData = (transactions, year, month) => {

  const years = useMemo(() =>
    [...new Set(transactions.map(t => new Date(t.date).getFullYear()))].sort((a, b) => b - a),
    [transactions]
  );

  const yearlyData = useMemo(() => {
    const yearMap = {};
    transactions.forEach(t => {
      const y = new Date(t.date).getFullYear();
      if (!yearMap[y]) yearMap[y] = { income: 0, expense: 0 };
      if (t.type === "income") yearMap[y].income += t.amount;
      else yearMap[y].expense += t.amount;
    });
    return Object.keys(yearMap).map(y => ({
      year: y,
      income: yearMap[y].income,
      expense: yearMap[y].expense,
      balance: Math.abs(yearMap[y].income - yearMap[y].expense),
    }));
  }, [transactions]);

  const monthlyData = useMemo(() => {
    const monthOrder = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const monthMap = {};
    transactions.forEach(t => {
      const date = new Date(t.date);
      if (date.getFullYear().toString() === year) {
        const m = date.toLocaleDateString("default", { month: "short" });
        if (!monthMap[m]) monthMap[m] = { income: 0, expense: 0 };
        if (t.type === "income") monthMap[m].income += t.amount;
        else monthMap[m].expense += t.amount;
      }
    });
    return Object.keys(monthMap)
      .sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b))
      .map(m => ({
        month: m,
        income: monthMap[m].income,
        expense: monthMap[m].expense,
        balance: Math.abs(monthMap[m].income - monthMap[m].expense),
      }));
  }, [transactions, year]);

  const pieData = useMemo(() => {
    const categoryMap = {};
    transactions
      .filter(t => {
        const date = new Date(t.date);
        const yearMatch = year === "all" || date.getFullYear().toString() === year;
        const monthMatch = month === "" || date.toLocaleDateString("default", { month: "short" }) === month;
        return yearMatch && monthMatch && t.type === "expense";
      })
      .forEach(t => {
        categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
      });
    return Object.keys(categoryMap).map(k => ({ name: k, value: categoryMap[k] }));
  }, [transactions, year, month]);

  const lineData = year === "all" ? yearlyData : monthlyData;

  return { years, lineData, pieData };
};