import React from "react";

const SummaryCards = ({ balance, totalIncome, totalExpense }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-gray-500">Total Balance</h2>
        <p className="text-2xl font-bold">
          ₹ {balance.toLocaleString()}
        </p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-gray-500">Income</h2>
        <p className="text-2xl font-bold text-green-600">
          ₹ {totalIncome.toLocaleString()}
        </p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-gray-500">Expenses</h2>
        <p className="text-2xl font-bold text-red-600">
          ₹ {totalExpense.toLocaleString()}
        </p>
      </div>

    </div>
  );
};

export default SummaryCards;