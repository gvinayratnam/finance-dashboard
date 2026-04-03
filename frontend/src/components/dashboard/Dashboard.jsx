import React, { useEffect, useState } from "react";

import Charts from "./Charts";
import TransactionTable from "../transactions/TransactionTable";
import { getTransactions } from "../../api/api";
import { deleteTransaction } from "../../api/api";
import { addTransaction } from "../../api/api";
import { updateTransaction } from "../../api/api";
import Filters from "../transactions/Filters";
import TransactionForm from "../transactions/TransactionForm";
import SummaryCards from "./SummaryCards";
import { calculateSummary, filterTransactions } from "../../utils.js/calculations";

const Dashboard = () => {
  const [role, setRole] = useState("viewer");
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("all");
  const [month, setMonth] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    type: "expense",
    date: new Date().toISOString().split("T")[0],
  });
  const [editId, setEditId] = useState(null);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  // import { updateTransaction } from "../../api/api";

  const handleAdd = async () => {
    try {
      const data = {
        ...formData,
        amount: Number(formData.amount),
        date: formData.date || new Date().toISOString().split("T")[0],
      };

      if (editId) {
        // 🔥 UPDATE
        await updateTransaction(editId, data);
      } else {
        // ➕ ADD
        await addTransaction(data);
      }

      setEditId(null); // reset
      setFormData({
        title: "",
        amount: "",
        category: "",
        type: "expense",
      });

      fetchTransactions();
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const fetchTransactions = async () => {
    const res = await getTransactions();
    setTransactions(res.data);
  };
  const handleDelete = async (id) => {
    await deleteTransaction(id);
    fetchTransactions();
  };
  useEffect(() => {
    fetchTransactions()
  }, []);


  const { totalIncome, totalExpense, balance } = calculateSummary(transactions);

  // table filter 

  const filteredTransactions = filterTransactions(
    transactions,
    search,
    category,
    type
  );
  // chart theme 

  const years = [
    ...new Set(
      transactions.map(t => new Date(t.date).getFullYear())
    )
  ].sort((a, b) => b - a)
  // console.log(years)


  // line chart
  // yearlydata
  const yearMap = {};

  transactions.forEach(t => {
    const y = new Date(t.date).getFullYear();

    if (!yearMap[y]) {
      yearMap[y] = { income: 0, expense: 0 };
    }
    // console.log(yearMap)
    if (t.type === "income") {
      yearMap[y].income += t.amount
    } else {
      yearMap[y].expense += t.amount
    }
  })

  // console.log(yearMap)

  const yearlyData = Object.keys(yearMap).map(y => {
    return (
      {
        year: y,
        income: yearMap[y].income,
        expense: yearMap[y].expense,
        balance: Math.abs(yearMap[y].income - yearMap[y].expense)
      }
    )
  })
  // console.log(yearlyData)

  // montholy data

  const monthMap = {}

  transactions.forEach(t => {
    const date = new Date(t.date);

    if (date.getFullYear().toString() === year) {
      const m = date.toLocaleDateString("default", { month: "short" })

      if (!monthMap[m]) {
        monthMap[m] = { income: 0, expense: 0 }
      }
      if (t.type === "income") {
        monthMap[m].income += t.amount
      } else {
        monthMap[m].expense += t.amount
      }
    }
  })
  // console.log(monthMap)
  const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthlyData = Object.keys(monthMap)
    .sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b))
    .map((m) => {
      return (
        {
          month: m,
          income: monthMap[m].income,
          expense: monthMap[m].expense,
          balance: Math.abs(monthMap[m].income - monthMap[m].expense)

        }
      )
    })
  console.log(monthlyData)
  const lineData = year === "all" ? yearlyData : monthlyData;

  // pie chart 

  const filterPie = transactions.filter(t => {
    const date = new Date(t.date);
    const yearMatch = year === "all" || date.getFullYear().toString() === year;
    const monthMatch = month === "" || date.toLocaleDateString("default", { month: 'short' }) === month
    return yearMatch && monthMatch && t.type === "expense";
  })

  const categoryMap = {};

  filterPie.forEach((t) => {
    categoryMap[t.category] =
      (categoryMap[t.category] || 0) + t.amount;
  });
  console.log(categoryMap)
  const pieData = Object.keys(categoryMap).map(k => (
    {
      name: k,
      value: categoryMap[k]
    }
  ))
  console.log(pieData)
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Finance Dashboard</h1>
        <select name="" id="" className="border p-2 rounded" value={role} onChange={e => setRole(e.target.value)}>
          <option value="viewer">viewer</option>
          <option value="admin">admin</option>
        </select>
      </div>
      <div className="mb-4">
        <span
          className={`px-3 py-1 rounded-full text-sm ${role === "admin"
            ? "bg-green-100 text-green-600"
            : "bg-gray-200 text-gray-600"
            }`}
        >
          Role: {role}
        </span>
      </div>
     

      <hr />



      <SummaryCards
        balance={balance}
        totalIncome={totalIncome}
        totalExpense={totalExpense}
      />

      <hr />
      {/* charts */}
      {/* year dropdown */}
      <div>
        <select name="" id="" value={year} onChange={e => { setYear(e.target.value); setMonth(""); }}>
          <option value="all">All Years</option>
          {
            years.map(y => <option key={y} value={y}>{y}</option>)
          }
        </select>
      </div>
      {/* month dropdown */}
      <select
        className="border p-2 rounded"
        value={month}
        disabled={year === "all"}
        onChange={(e) => setMonth(e.target.value)}
      >
        <option value="">All Months</option>
        <option value="Jan">Jan</option>
        <option value="Feb">Feb</option>
        <option value="Mar">Mar</option>
        <option value="Apr">Apr</option>
        <option value="May">May</option>
        <option value="Jun">Jun</option>
        <option value="Jul">Jul</option>
        <option value="Aug">Aug</option>
        <option value="Sep">Sep</option>
        <option value="Oct">Oct</option>
        <option value="Nov">Nov</option>
        <option value="Dec">Dec</option>
      </select>
      <hr />

      <Charts transactions={transactions} lineData={lineData} year={year} pieData={pieData} />
      <hr />
      {/* table */}
      <Filters
        setSearch={setSearch}
        setCategory={setCategory}
        setType={setType}
      />

      {role === "admin" && (
        <TransactionForm
          formData={formData}
          handleChange={handleChange}
          handleAdd={handleAdd}
          editId={editId}
        />
      )}

      <TransactionTable transactions={filteredTransactions} role={role} onDelete={handleDelete} onEdit={(t) => {
        setFormData(t);   // fill form
        setEditId(t.id);  // store id
      }} />
    </div>

  );
};

export default Dashboard;