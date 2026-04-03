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
   
  const resetForm = () => { setFormData(emptyFrom); setEditId(null); };
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const { transactions, handleAdd, handleDelete } = useTransactions();
  const { years, lineData, pieData } = useChartData(transactions, year, month);
  const { setSearch, setCategory, setType, filteredTransactions } = useFilters(transactions);
  const { totalIncome, totalExpense, balance } = calculateSummary(transactions);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Finance Dashboard</h1>
        <select className="border p-2 rounded" value={role} onChange={e => setRole(e.target.value)}>
          <option value="viewer">viewer</option>
          <option value="admin">admin</option>
        </select>
      </div>

      <div className="mb-4">
        <span className={`px-3 py-1 rounded-full text-sm ${role === "admin" ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-600"}`}>
          Role: {role}
        </span>
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
        <TransactionForm formData={formData} handleChange={handleChange} editId={editId}
          handleAdd={() => handleAdd(formData, editId, resetForm)} />
      )}

      <TransactionTable transactions={filteredTransactions} role={role} onDelete={handleDelete}
        onEdit={t => { setFormData(t); setEditId(t.id); }} />
    </div>
  );
};

export default Dashboard;