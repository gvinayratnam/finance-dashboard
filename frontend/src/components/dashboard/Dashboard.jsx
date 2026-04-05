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
import {  FiCalendar } from "react-icons/fi";
import FinancialInsights from "./FinancialInsights";
import SummaryCardsSkeleton from "./SummaryCardsSkeleton";
import FinancialInsightsSkeleton from "./FinancialInsightsSkeleton";
import ChartsSkeleton from "./ChartsSkeleton";
import TransactionTableSkeleton from "../transactions/TransactionTableSkeleton";


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

  const downloadJSON = (data, filename) => {
    if (!data || data.length === 0) {
      alert("No data available to download");
      return;
    }

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
  };
    const handleDownloadAll = () => {
    downloadJSON(transactions, `all-transactions-${Date.now()}.json`);
  };

  const handleDownloadFiltered = () => {
    downloadJSON(filteredTransactions, `filtered-transactions-${Date.now()}.json`);
  };
  return (
    <div className=" min-h-screen bg-white dark:bg-gray-900 text-gray-900 ">

      <nav className="flex justify-between items-center border-b border-b-gray-200 dark:border-b-gray-600 container-p sm:py-5 py-3">

        {/* left */}
        <div className="flex items-center sm:gap-2 gap-1">
          <p className="bg-indigo-600 sm:text-3xl text-lg text-white font-semibold sm:h-13 sm:w-13 h-7 w-7 sm:rounded-2xl rounded-lg flex items-center justify-center ">F</p>
          <div>
            <h1 className="sm:text-2xl text-lg font-medium sm:font-semibold dark:text-white">FinanceHub</h1>
            <p className="text-gray-500 text-xs sm:block hidden ">Financial Dashboard</p>
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

      <div className="flex justify-between py-4 items-center container-p gap-3">
        <div>
          <h1 className="sm:text-3xl text-lg font-semibold dark:text-white">Dashboard Overview</h1>
          <p className="text-gray-500 sm:text-base text-xs">Welcome back! Here's your financial summary.</p>
        </div>
        
        <div>
          {role === "admin" && (
        <>
          <button
            onClick={() => setShowForm(true)}
            className=" sm:px-3 px-2 py-2 text-xs sm:text-base bg-indigo-600 border hover:bg-indigo-700 text-white sm:rounded-xl rounded-lg sm:font-medium">
            Add <span className="sm:inline hidden">Transaction</span>
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
              
        </div>

      </div>
      
      {transactions.length === 0 ? (
          <SummaryCardsSkeleton />
        ) : (
          <SummaryCards 
            balance={balance} 
            totalIncome={totalIncome} 
            totalExpense={totalExpense} 
          />
        )}

      <div className="container-p">
        {transactions.length === 0 ? (
          <FinancialInsightsSkeleton />
        ) : (
          <FinancialInsights transactions={transactions} />
        )}
      </div>
      <div className="flex gap-2 my-4 container-p flex-nowrap">
          
        {/* Year */}
        <div className="w-1/2 sm:w-auto flex items-center gap-1 bg-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700 rounded-lg sm:rounded-xl">
          <Select
            className="w-full sm:w-40"
            value={year}
            onChange={(value) => {
              setYear(value);
              setMonth("");
            }}
            suffixIcon={
              <FiChevronDown className="text-gray-600 dark:text-gray-300" />
            }
            variant="borderless"
            dropdownMatchSelectWidth={false}
            popupClassName="custom-select-dropdown"   // ✅ ADD THIS
            placeholder="All Years"
            labelRender={({ value }) => (
              <div className="flex items-center gap-2 py-1 px-1">
                <FiCalendar className="text-indigo-400" />
                <span className="dark:text-white">
                  {value === "all" ? "All Years" : value}
                </span>
              </div>
            )}
            options={[
              { value: "all", label: "All Years" },
              ...years.map((y) => ({
                value: y,
                label: y,
              })),
            ]}
          />
        </div>

          
        {/* Month */}
        <div
          className={`w-1/2 sm:w-auto flex items-center gap-1 rounded-lg sm:rounded-xl transition-all duration-200
            ${year === "all"
              ? "bg-gray-100 dark:bg-gray-800 opacity-50 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700 cursor-pointer"
            }`}
        >
          <Select
            className="w-full sm:w-40"
            value={month}
            onChange={(value) => setMonth(value)}
            disabled={year === "all"}
            suffixIcon={
              <FiChevronDown
                className={year === "all"
                  ? "text-gray-400 dark:text-gray-500"
                  : "text-gray-600 dark:text-gray-300"
                }
              />
            }
            variant="borderless"
            dropdownMatchSelectWidth={false}
            popupClassName="custom-select-dropdown"
            placeholder="All Months"
            labelRender={({ value }) => (
              <div className="flex items-center gap-2 py-1 px-1">
                <FiCalendar
                  className={year === "all" ? "text-gray-400" : "text-indigo-400"}
                />
                <span
                  className={year === "all"
                    ? "text-gray-400 dark:text-gray-500"
                    : "dark:text-white"
                  }
                >
                  {value || "All Months"}
                </span>
              </div>
            )}
            options={[
              { value: "", label: "All Months" },
              ...["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map(
                (m) => ({ value: m, label: m })
              ),
            ]}
          />
        </div>

      </div>

      
      {transactions.length === 0 ? (<ChartsSkeleton />) : (<Charts lineData={lineData} year={year} pieData={pieData} />)}

      <div className="container-p">
          <div className="flex justify-between gap-4 sm:flex-row flex-col mb-2">
            <div>
              <h2 className="text-4xl font-semibold dark:text-white">Transactions</h2>
              {role === "viewer" && (
                <p className="text-sm text-gray-500">
                  Read-only access
                </p>
              )}
            </div>
            
            {/* Download Buttons */}
            <div className="flex gap-2">

              <button
                onClick={handleDownloadAll}
                className="flex items-center gap-1 px-3 py-2 text-xs sm:text-sm 
                bg-gray-200 hover:bg-gray-300 
                dark:bg-gray-700 dark:hover:bg-gray-600 
                text-gray-800 dark:text-white 
                rounded-lg sm:rounded-xl transition"
              >
                Download All
              </button>
            
              <button
                onClick={handleDownloadFiltered}
                className="flex items-center gap-1 px-3 py-2 text-xs sm:text-sm 
                bg-indigo-100 hover:bg-indigo-200 
                dark:bg-indigo-600/20 dark:hover:bg-indigo-600/40 
                text-indigo-600 dark:text-indigo-300 
                rounded-lg sm:rounded-xl transition"
              >
                Download Filtered
              </button>
            
            </div>
          </div>
          <Filters setSearch={setSearch} setCategory={setCategory} setType={setType} />
          {transactions.length === 0 ? (<TransactionTableSkeleton role={role} />) : (
              <TransactionTable
                transactions={filteredTransactions}
                role={role}
                onDelete={handleDelete}
                onEdit={t => {
                  setFormData(t);
                  setEditId(t.id);
                  setShowForm(true);
                }}
              />
            )}
      </div>

    
    </div>
  );
};

export default Dashboard;