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
  Legend,
} from "recharts";

const COLORS = ["#22c55e", "#ef4444", "#3b82f6", "#f59e0b", "#8b5cf6"];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const income = payload.find(p => p.dataKey === "income")?.value || 0;
    const expense = payload.find(p => p.dataKey === "expense")?.value || 0;
    const balance = payload.find(p => p.dataKey === "balance")?.value || 0;

    return (
      <div className="bg-white rounded-xl shadow-md px-4 py-3">
        <p className="text-sm font-semibold text-gray-700 mb-1">{label}</p>

        <p className="text-sm text-gray-500 flex justify-between gap-2">
          <span>Balance:</span> <span className="text-blue-500 font-medium">₹{balance}</span>
        </p>
        <p className="text-sm text-gray-500 flex justify-between gap-2">
          <span>Income:</span> <span className="text-green-500 font-medium">₹{income}</span>
        </p>
        <p className="text-sm text-gray-500 flex justify-between gap-2">
         <span> Expenses:</span> <span className="text-red-500 font-medium">₹{expense}</span>
        </p>
      </div>
    );
  }

  return null;
};

const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value, percent } = payload[0];

    return (
      <div className="bg-white rounded-2xl shadow-lg px-4 py-3 border border-gray-100">
        <p className="text-sm font-semibold text-gray-700 mb-2">
          {name}
        </p>

        <p className="text-sm text-gray-500">
          Amount:{" "}
          <span className="font-semibold text-gray-800">
            ₹{value.toLocaleString()}
          </span>
        </p>

        <p className="text-sm text-gray-500">
          Percentage:{" "}
          <span className="font-semibold text-gray-800">
            {(percent * 100).toFixed(1)}%
          </span>
        </p>
      </div>
    );
  }

  return null;
};
const Charts = React.memo(({ lineData, year, pieData }) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 container-p mb-10">

      {/* Line Chart */}
      <div className="bg-white p-5 rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.10)] ">
        <h2 className=" font-semibold text-lg">Monthly Trend</h2>
        <p className="mb-6 text-gray-500 text-sm">Track your financial activity over time</p>
        <LineChart width="100%" height={300} data={lineData}>
          <CartesianGrid stroke="#f3f4f6" strokeDasharray="3 3" />

          <XAxis dataKey={year === "all" ? "year" : "month"} tick={{ fontSize: 12 }} />
          <YAxis domain={[-100, 'auto']} tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />}/>

          <Legend verticalAlign="bottom" height={36} iconType="circle"/>

          <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={2} />
          <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} />
          <Line type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </div>
      {/* Pie Chart */}
      <div className="bg-white p-5 rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.10)]">
        <h2 className="mb-4 font-semibold text-lg">Spending by Category</h2>
        <p className="mb-4 text-gray-500 text-sm">Breakdown of your expenses</p>
        <PieChart width="100%" height={300}>
          <Pie data={pieData} dataKey="value" outerRadius={100} label={({ value }) => (value > 400 ? value : "")} labelLine={false} >
            {pieData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomPieTooltip />} />
          <Legend verticalAlign="bottom" height={36} iconType="circle"/>
        </PieChart>
      </div>
    </div>
  );
});

export default Charts;