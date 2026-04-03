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

const Charts = ({ lineData, year , pieData}) => {
  

  
  // console.log(lineData)
  console.log(pieData)
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Pie Chart */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="mb-4 font-semibold">Spending by Category</h2>
        <PieChart width={300} height={300}>
          <Pie data={pieData} dataKey="value" outerRadius={100} label>
            {pieData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* Line Chart */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="mb-4 font-semibold">Monthly Trend</h2>
        <LineChart width={500} height={300} data={lineData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey={year === "all" ? "year" : "month"} />
          <YAxis />
          <Tooltip />

          <Line type="monotone" dataKey="income" stroke="#22c55e" />
          <Line type="monotone" dataKey="expense" stroke="#ef4444" />
          <Line type="monotone" dataKey="balance" stroke="#3b82f6" />
        </LineChart>
      </div>

    </div>
  );
};

export default Charts;