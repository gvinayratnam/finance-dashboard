import React, { useEffect, useState } from "react";
import API from "../api";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    API.get("transactions/")
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Finance Dashboard</h1>

      {transactions.map((t) => (
        <div key={t.id}>
          <p>{t.title} - ₹{t.amount}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;