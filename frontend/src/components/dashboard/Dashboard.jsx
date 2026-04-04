import React, { useState } from "react";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, message, Select, Space, Switch } from 'antd';
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
import { FiChevronDown, FiUser } from "react-icons/fi";

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
    <div className=" min-h-screen bg-white dark:bg-gray-900 text-gray-900 ">
      <div className="flex justify-between items-center mb-6 border-b border-b-gray-200 dark:border-b-gray-600 px-4 py-4">

        <div className="flex items-center gap-2 ">
          <p className="bg-indigo-600 text-3xl text-white font-semibold h-13 w-13 rounded-2xl flex items-center justify-center ">F</p>
          <div>
            <h1 className="text-2xl font-semibold dark:text-white">FinanceHub</h1>
            <p className="text-gray-400 text-xs">Financial Dashboard</p>
          </div>
        </div>

        <div className="flex gap-3 items-center">


          <div
            onClick={toggleTheme}
            className="cursor-pointer px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 transition hover:bg-gray-100 dark:hover:bg-gray-600/95"
          >
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {isDark ? "Dark Mode" : "Light Mode"}
            </span>
          </div>

          {/* role dropdown */}
          <div className="flex items-center gap-1 bg-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700 rounded-xl ">
            <Select
              value={role}
              suffixIcon={
                <FiChevronDown className="text-gray-600 dark:text-gray-300" />
              }
              onChange={(value) => setRole(value)}
              style={{ width: 170 }}
              variant="borderless"
              popupClassName="custom-select-dropdown"
              labelRender={({ value }) => (
                <div className="flex leading-tight gap-2 py-1 px-1 items-center">
                  <div className="bg-indigo-400 rounded-full w-8 h-8 flex justify-center items-center">
                    <FiUser className="text-lg text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium dark:text-white capitalize">{value}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Active Role</span>
                  </div>
                </div>
              )}
              options={[
                {
                  value: "viewer", label: <div className=" ">
                    <p className="font-medium  capitalize ">Viewer</p>
                    <p className="text-xs text-gray-400">Read-Only</p>
                  </div>
                },
                {
                  value: "admin", label: <div className="">
                    <p className="font-medium  capitalize ">Admin</p>
                    <p className="text-xs text-gray-400">Full access</p>
                  </div>
                },
              ]}
            />
          </div>

        </div>
      </div>

      <hr />

      {/* <SummaryCards balance={balance} totalIncome={totalIncome} totalExpense={totalExpense} /> */}

      <hr />
{/* 
      <div className="flex gap-2 my-4">
        <select className="border p-2 rounded" value={year} onChange={e => { setYear(e.target.value); setMonth(""); }}>
          <option value="all">All Years</option>
          {years.map(y => <option key={y} value={y}>{y}</option>)}
        </select>

        <select className="border p-2 rounded" value={month} disabled={year === "all"} onChange={e => setMonth(e.target.value)}>
          <option value="">All Months</option>
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div> */}

      <hr />
      {/* <Charts lineData={lineData} year={year} pieData={pieData} /> */}

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

      {/* <TransactionTable transactions={filteredTransactions} role={role} onDelete={handleDelete}
        onEdit={t => { setFormData(t); setEditId(t.id); setShowForm(true); }} /> */}
    </div>
  );
};

export default Dashboard;