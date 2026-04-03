import React, { useEffect, useState } from "react";
import API from "../../api/api";
import Charts from "./Charts";
import TransactionTable from "../transactions/TransactionTable";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    API.get("transactions/")
      .then((res) => {
        console.log(res.data);
        setTransactions(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
  const totalIncome = transactions.filter(t=>t.type === 'income')
      .reduce((acc,t)=>acc+t.amount,0)
  const totalExpense = transactions.filter(t=>t.type==='expense')
      .reduce((acc,t)=>acc+t.amount,0)   
  const balance = totalIncome-totalExpense
  console.log(balance)
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Transactions</h1>

      {transactions.map((t) => (
        <div key={t.id} className="border p-3 mb-2">
          <p><strong>{t.title}</strong></p>
          <p>{t.category}</p>
          <p>{t.type}</p>
          <p>₹{t.amount}</p>
          <p>{t.date}</p>
        </div>
      ))}
      
      <hr /> 

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 ">
        <div className="bg-white p-5 rounded-xl shadow ">
          <h2 className="text-gray-500">Total Balance</h2>
          <p className="text-2xl font-bold ">₹ {balance.toLocaleString()}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500">Income</h2>
          <p className="text-2xl font-bold text-green-600">₹ {totalIncome.toLocaleString()}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500">Expenses</h2>
          <p className="text-2xl font-bold text-red-600">₹ {totalExpense.toLocaleString()}</p>
        </div>
      </div>

      <hr />
      <Charts transactions={transactions} />
      <hr />
      <TransactionTable transactions={transactions} />
    </div>

  );
};

export default Dashboard;