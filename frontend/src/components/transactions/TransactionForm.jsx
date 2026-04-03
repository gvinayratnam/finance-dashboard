import React from "react";

const TransactionForm = ({
  formData,
  handleChange,
  handleAdd,
  editId,
}) => {
  return (
    <div className="mt-6 flex gap-2 flex-wrap">

      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="title"
      />

      <input
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        placeholder="amount"
      />

      <input
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="category"
      />

      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <button onClick={handleAdd}>
        {editId ? "Update" : "Add"}
      </button>

    </div>
  );
};

export default TransactionForm;