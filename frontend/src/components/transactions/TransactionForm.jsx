import React from "react";

const CATEGORIES_INCOME = ["Salary", "Freelance", "Investment"];
const CATEGORIES_EXPENSE = ["Shopping", "Food", "Utilities", "Entertainment", "Healthcare", "Transport"];

const TransactionForm = ({ formData, handleChange, handleAdd, editId, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-2 sm:px-4">

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-4 sm:p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold dark:text-white">
            {editId ? "Edit Transaction" : "Add Transaction"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-lg sm:text-xl"
          >
            ✕
          </button>
        </div>

        {/* Description */}
        <div className="mb-3 sm:mb-4">
          <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Grocery shopping"
            className="w-full border rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Type toggle */}
        <div className="mb-3 sm:mb-4">
          <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Type
          </label>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              onClick={() => handleChange({ target: { name: "type", value: "income" } })}
              className={`w-full py-2.5 sm:py-3 text-sm sm:text-base rounded-xl font-medium border transition-all ${
                formData.type === "income"
                  ? "border-green-500 text-green-600 bg-green-50"
                  : "border-gray-200 text-gray-500 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              }`}
            >
              Income
            </button>

            <button
              onClick={() => handleChange({ target: { name: "type", value: "expense" } })}
              className={`w-full py-2.5 sm:py-3 text-sm sm:text-base rounded-xl font-medium border transition-all ${
                formData.type === "expense"
                  ? "border-red-400 text-red-500 bg-red-50"
                  : "border-gray-200 text-gray-500 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              }`}
            >
              Expense
            </button>
          </div>
        </div>

        {/* Category */}
        <div className="mb-3 sm:mb-4">
          <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select category</option>
            <optgroup label="── Income ──">
              {CATEGORIES_INCOME.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </optgroup>
            <optgroup label="── Expense ──">
              {CATEGORIES_EXPENSE.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* Amount */}
        <div className="mb-4 sm:mb-6">
          <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Amount
          </label>
          <div className="flex items-center border rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus-within:ring-2 focus-within:ring-indigo-400">
            <span className="text-gray-400 mr-2 text-sm sm:text-base">₹</span>
            <input
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              className="flex-1 bg-transparent outline-none text-sm sm:text-base dark:text-white"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            onClick={onClose}
            className="w-full py-2.5 sm:py-3 text-sm sm:text-base rounded-xl border border-gray-200 text-gray-600 dark:text-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium"
          >
            Cancel
          </button>

          <button
            onClick={handleAdd}
            className="w-full py-2.5 sm:py-3 text-sm sm:text-base rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors"
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default TransactionForm;