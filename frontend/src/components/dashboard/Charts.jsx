import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const COLORS = ["#22c55e", "#ef4444", "#3b82f6", "#f59e0b", "#8b5cf6"];

const Charts = ({ transactions }) => {
  // 🟣 Category Data (only expenses)
  const categoryMap = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const categoryData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  // 🔵 Monthly Data
  const monthMap = {};
  transactions.forEach((t) => {
    const month = new Date(t.date).toLocaleString("default", {
      month: "short",
    });

    monthMap[month] = (monthMap[month] || 0) + t.amount;
  });

  const monthlyData = Object.keys(monthMap).map((key) => ({
    month: key,
    amount: monthMap[key],
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Pie Chart */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="mb-4 font-semibold">Spending by Category</h2>
        <PieChart width={300} height={300}>
          <Pie
            data={categoryData}
            dataKey="value"
            outerRadius={100}
            label
          >
            {categoryData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* Line Chart */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="mb-4 font-semibold">Monthly Trend</h2>
        <LineChart width={400} height={300} data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" />
        </LineChart>
      </div>

    </div>
  );
};

export default Charts;