import React from "react";

const TransactionTable = ({ transactions,role, onDelete, onEdit  }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow mt-6 overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">Transactions</h2>
      {role === "viewer" && (
        <p className="text-sm text-gray-500 mb-3">
          Read-only access
        </p>
      )}
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Type</th>
            <th className="text-left">Amount</th>
            {role === "admin" && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {transactions.map((t) => (
            <tr key={t.id} className="border-b">
              <td className="py-2">{t.date}</td>
              <td>{t.title}</td>
              <td>{t.category}</td>
              <td>{t.type}</td>
              <td className="text-left">
                <span
                  className={
                    t.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  ₹{t.amount}
                </span>
              </td>
              {
                role === "admin" && (
                  <td className="flex gap-2">
                    <button   onClick={() => onEdit(t)} >Edit</button>
                    <button  onClick={() => onDelete(t.id)}>Delete</button>
                  </td>
                )
              }
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;