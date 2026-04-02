import React, { useEffect, useState } from "react";
import API from "../../api/api";

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
    </div>
  );
};

export default Dashboard;