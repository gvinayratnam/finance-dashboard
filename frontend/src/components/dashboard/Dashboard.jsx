import React, { useState } from "react";
import Charts from "./Charts";
import SummaryCards from "./SummaryCards";
import Filters from "../transactions/Filters";
import TransactionForm from "../transactions/TransactionForm";
import TransactionTable from "../transactions/TransactionTable";
import { useTransactions } from "../../hooks/useTransactions";
import { useChartData } from "../../hooks/useChartData";
import { useFilters } from "../../hooks/useFilters";
import { calculateSummary } from "../../utils.js/calculations";
import { useTheme } from "../../hooks/useTheme";

const emptyFrom = {
  title: "", amount: "", category: "", type: "expense",
  date: new Date().toISOString().split("T")[0],
};


const Dashboard = () => {
  const [role, setRole] = useState("viewer");
  const [year, setYear] = useState("all");
  const [month, setMonth] = useState("");
  const [formData, setFormData] = useState(emptyFrom);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const resetForm = () => {
  setFormData(emptyFrom);
  setEditId(null);
  setShowForm(false); 
};
  
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const { isDark, toggleTheme } = useTheme();
  const { transactions, handleAdd, handleDelete } = useTransactions();
  const { years, lineData, pieData } = useChartData(transactions, year, month);
  const { setSearch, setCategory, setType, filteredTransactions } = useFilters(transactions);
  const { totalIncome, totalExpense, balance } = calculateSummary(transactions);

  return (
     <div className="p-6 min-h-screen bg-white dark:bg-gray-900 text-gray-900 ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Finance Dashboard</h1>

        <div className="flex gap-3 items-center">

          {/* Toggle button */}
          <button
            onClick={toggleTheme}
            className="w-12 h-6 rounded-full relative transition-colors duration-300 bg-gray-300 dark:bg-blue-600"
          >
            <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${isDark ? "translate-x-6" : "translate-x-0"}`} />
          </button>

          <select className="border p-2 rounded dark:bg-gray-800 dark:border-gray-600 w-50" value={role} onChange={e => setRole(e.target.value)}>
            <option className="text-red-900! pl-5!" value="viewer">viewer</option>
            <option value="admin">admin</option>
          </select>
        </div>
      </div>

      <hr />

      <SummaryCards balance={balance} totalIncome={totalIncome} totalExpense={totalExpense} />

      <hr />

    <div className="flex gap-2 my-4">
        <select className="border p-2 rounded" value={year} onChange={e => { setYear(e.target.value); setMonth(""); }}>
          <option value="all">All Years</option>
          {years.map(y => <option key={y} value={y}>{y}</option>)}
        </select>

        <select className="border p-2 rounded" value={month} disabled={year === "all"} onChange={e => setMonth(e.target.value)}>
          <option value="">All Months</option>
          {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      <hr />
      <Charts lineData={lineData} year={year} pieData={pieData} />

      <hr />

      <Filters setSearch={setSearch} setCategory={setCategory} setType={setType} />

      {role === "admin" && (
  <>
    <button
      onClick={() => setShowForm(true)}
      className="mb-4 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium"
    >
      + Add Transaction
    </button>

    {showForm && (
      <TransactionForm
        formData={formData}
        handleChange={handleChange}
        editId={editId}
        handleAdd={() => handleAdd(formData, editId, resetForm)}
        onClose={resetForm}
      />
    )}
  </>
)}

      <TransactionTable transactions={filteredTransactions} role={role} onDelete={handleDelete}
        onEdit={t => { setFormData(t); setEditId(t.id); setShowForm(true); }}/>
    </div>
  );
};

export default Dashboard;