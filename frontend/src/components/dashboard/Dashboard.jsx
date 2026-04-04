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
import { IoSunny, IoSunnyOutline } from "react-icons/io5";

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

      <nav className="flex justify-between items-center border-b border-b-gray-200 dark:border-b-gray-600 container-p sm:py-5 py-3">
        
        {/* left */}
        <div className="flex items-center sm:gap-2 gap-1">
          <p className="bg-indigo-600 sm:text-3xl text-lg text-white font-semibold sm:h-13 sm:w-13 h-7 w-7 sm:rounded-2xl rounded-lg flex items-center justify-center ">F</p>
          <div>
            <h1 className="sm:text-2xl text-lg font-medium sm:font-semibold dark:text-white">FinanceHub</h1>
            <p className="text-gray-400 text-xs sm:block hidden ">Financial Dashboard</p>
          </div>
          
        </div>

        {/* right */}
        <div className="flex gap-3 items-center">

          <div
            onClick={toggleTheme}
            className="cursor-pointer sm:p-2 p-1 md:rounded-2xl sm:rounded-xl rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 transition duration-300 hover:bg-gray-100 dark:hover:bg-gray-600/95"
          >
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            
              <IoSunny  className={` sm:text-3xl text-lg transition-transform duration-500 ${isDark? "rotate-90 " : "rotate-0" }`}/>
            </span>

          </div>

          {/* role dropdown */}
          <div className="flex items-center gap-1 bg-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700 sm:rounded-xl rounded-lg">
            <Select
              value={role}
              suffixIcon={
                <FiChevronDown className="text-gray-600 dark:text-gray-300" />
              }
              onChange={(value) => setRole(value)}
              className="sm:w-42 "
              variant="borderless"
              dropdownMatchSelectWidth={false} 
              popupClassName="custom-select-dropdown"
              labelRender={({ value }) => (
                <div className="flex leading-tight sm:gap-2 gap-1 py-1 sm:px-1 px-0 items-center">
                  <div className="sm:bg-indigo-400 rounded-full sm:w-8 sm:h-8 flex justify-center items-center">
                    <FiUser className="sm:text-lg text-base  sm:text-white text-indigo-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="sm:inline hidden font-medium dark:text-white capitalize">{value}</span>
                    <span className="sm:inline hidden text-xs text-gray-500 dark:text-gray-400">Active Role</span>
                  </div>
                </div>
              )}
              options={[
                {
                  value: "viewer", label: <div className=" ">
                    <p className="font-medium capitalize ">Viewer</p>
                    <p className="text-xs text-gray-400 dark:text-gray-600">Read-Only</p>
                  </div>
                },
                {
                  value: "admin", label: <div className="">
                    <p className="font-medium  capitalize ">Admin</p>
                    <p className="text-xs text-gray-400 dark:text-gray-600">Full access</p>
                  </div>
                },
              ]}
            />
          </div>

        </div>
      </nav>

      <div>

      </div>

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