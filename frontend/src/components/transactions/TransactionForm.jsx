import React from "react";

const CATEGORIES = ["Shopping", "Food", "Utilities", "Entertainment", "Healthcare", "Transport"];

const TransactionForm = ({ formData, handleChange, handleAdd, editId, onClose }) => {
  return (
    // Backdrop
    <div  className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      {/* Modal box */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold dark:text-white">
            {editId ? "Edit Transaction" : "Add Transaction"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl font-light"
          >
            ✕
          </button>
        </div>

        {/* Date */}
        {/* <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div> */}

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Grocery shopping"
            className="w-full border rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Type toggle */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type</label>
          <div className="flex gap-3">
            <button
              onClick={() => handleChange({ target: { name: "type", value: "income" } })}
              className={`flex-1 py-3 rounded-xl font-medium border transition-all ${
                formData.type === "income"
                  ? "border-green-500 text-green-600 bg-green-50"
                  : "border-gray-200 text-gray-500 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              }`}
            >
              Income
            </button>
            <button
              onClick={() => handleChange({ target: { name: "type", value: "expense" } })}
              className={`flex-1 py-3 rounded-xl font-medium border transition-all ${
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
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select category</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Amount */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
          <div className="flex items-center border rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus-within:ring-2 focus-within:ring-indigo-400">
            <span className="text-gray-400 mr-2">₹</span>
            <input
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              className="flex-1 bg-transparent outline-none dark:text-white"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 dark:text-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors"
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default TransactionForm;