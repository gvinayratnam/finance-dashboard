import React from "react";
import { LuTrendingDown, LuTrendingUp, LuWallet } from "react-icons/lu";

const SummaryCards = ({ balance, totalIncome, totalExpense }) => {
  return (
    <div className="container-p grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

      <div className="bg-white px-6 py-4 rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.10)] transition-transform duration-300 hover:scale-102 dark:bg-gray-700 dark:border border-gray-600">
        <div className="flex justify-between">
          <div className="flex flex-col gap-3">
            <h2 className="text-gray-400 text-sm">Total Balance</h2>
            <p className="text-2xl font-bold dark:text-white">
              ₹ {balance.toLocaleString()}
            </p>
          </div>
         <div className="">
          <p className="p-2 rounded-xl bg-indigo-600"> <LuWallet className="text-3xl   text-white "/></p>
         </div>
        </div>

      </div>

      <div className="bg-white px-6 py-4 rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.10)] transition-transform duration-300 hover:scale-102 dark:bg-gray-700 dark:border border-gray-600">
  <div className="flex justify-between">
    <div className="flex flex-col gap-3">
      <h2 className="text-gray-400 text-sm">Income</h2>
      <p className="text-2xl font-bold dark:text-white">
        ₹ {totalIncome.toLocaleString()}
      </p>
    </div>
    <div>
      <p className="p-2 rounded-xl bg-green-600">
        <LuTrendingUp className="text-3xl text-white" />
      </p>
    </div>
  </div>
</div>

      <div className="bg-white px-6 py-4 rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.10)] transition-transform duration-300 hover:scale-102 dark:bg-gray-700 dark:border border-gray-600">
  <div className="flex justify-between">
    <div className="flex flex-col gap-3">
      <h2 className="text-gray-400 text-sm">Expenses</h2>
      <p className="text-2xl font-bold dark:text-white">
        ₹ {totalExpense.toLocaleString()}
      </p>
    </div>
    <div>
      <p className="p-2 rounded-xl bg-red-600">
        <LuTrendingDown className="text-3xl text-white" />
      </p>
    </div>
  </div>
</div>

    </div>
  );
};

export default SummaryCards;