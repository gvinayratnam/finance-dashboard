import React from "react";
import { FiTrendingUp, FiTarget } from "react-icons/fi";
import { BsPiggyBank } from "react-icons/bs";

const FinancialInsights = ({ transactions = [] }) => {

  const expenses = transactions.filter(t => t.type === "expense");
  const income = transactions.filter(t => t.type === "income");

  // Top Spending Category
  const categoryMap = {};
  expenses.forEach(t => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
  });

  const topCategoryEntry = Object.entries(categoryMap)
    .sort((a, b) => b[1] - a[1])[0];

  const topCategory = topCategoryEntry?.[0];
  const topCategoryAmount = topCategoryEntry?.[1];

  // Savings Rate
  const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);

  const savingsRate =
    totalIncome > 0
      ? ((totalIncome - totalExpense) / totalIncome) * 100
      : 0;

  // Largest Expense (FIX: no mutation)
  const largestExpense =
    expenses.length > 0
      ? [...expenses].sort((a, b) => b.amount - a.amount)[0]
      : null;

  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-5 mb-6">
      <h2 className="text-xl font-semibold dark:text-white">
        Financial Insights
      </h2>
      <p className="text-gray-500 text-sm mb-4">
        Key observations about your finances
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

  {/* Top Category */}
  <div className="bg-purple-100 dark:bg-purple-900/20 p-4 rounded-xl 
    transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] ">
    
    <FiTrendingUp className="text-purple-500 mb-2 transition-transform duration-300 group-hover:scale-110" />
    
    <p className="text-sm text-gray-600 dark:text-gray-300">
      Top Spending Category
    </p>
    
    <h3 className="font-semibold dark:text-white">
      {topCategory || "No data"}
    </h3>
    
    <p className="text-sm text-gray-500">
      ₹{topCategoryAmount ? topCategoryAmount.toLocaleString() : 0}
    </p>
  </div>

  {/* Savings Rate */}
  <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-xl 
    transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] ">
    
    <BsPiggyBank className="text-green-500 mb-2 transition-transform duration-300" />
    
    <p className="text-sm text-gray-600 dark:text-gray-300">
      Savings Rate
    </p>
    
    <h3 className="font-semibold dark:text-white">
      {totalIncome === 0 ? "No data" : `${savingsRate.toFixed(1)}%`}
    </h3>
    
    <p className="text-sm text-gray-500">of total income</p>
  </div>

  {/* Largest Expense */}
  <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded-xl 
    transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]  ">
    
    <FiTarget className="text-red-500 mb-2 transition-transform duration-300" />
    
    <p className="text-sm text-gray-600 dark:text-gray-300">
      Largest Expense
    </p>
    
    <h3 className="font-semibold dark:text-white">
      {largestExpense?.category || "No data"}
    </h3>
    
    <p className="text-sm text-gray-500">
      ₹{largestExpense ? largestExpense.amount.toLocaleString() : 0}
    </p>
  </div>

</div>
    </div>
  );
};

export default FinancialInsights;