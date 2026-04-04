import React from "react";

const Filters = ({ setSearch, setCategory, setType }) => {
  return (
    <div className="mb-4">

      <input
        placeholder="search"
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mr-2"
      />

      <select name="" id="" onChange={e => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Shopping">Shopping</option>
          <option value="Food">Food</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Transport">Transport</option>
        </select>

      <select name="" id="" onChange={e => setType(e.target.value)}>
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

    </div>
  );
};

export default Filters;

