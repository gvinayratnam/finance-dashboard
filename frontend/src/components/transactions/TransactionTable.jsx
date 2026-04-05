import React, { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const TransactionTable = ({ transactions, role, onDelete, onEdit }) => {

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  //Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTransactions = transactions.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="bg-white dark:bg-gray-700 px-4 sm:px-8 py-5 rounded-xl mt-6 overflow-x-auto shadow-[0_0_10px_rgba(0,0,0,0.10)]">
      
      <table className="w-full text-left hidden sm:table">
        <thead>
          <tr className="border-b border-b-gray-300 dark:border-b-gray-600">
            <th className={`py-5 dark:text-white ${role === "admin" ? "pl-2" : "pl-4"}`}>
              Date
            </th>
            <th className="dark:text-white">Description</th>
            <th className="dark:text-white">Category</th>
            <th className="dark:text-white">Type</th>
            <th className={`text-right dark:text-white ${role === "admin" ? "pr-2" : "pr-4"}`}>
              Amount
            </th>
            {role === "admin" && (
              <th className="text-right dark:text-white pr-2">Actions</th>
            )}
          </tr>
        </thead>

        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td
                colSpan={role === "admin" ? 6 : 5}
                className="text-center py-10 text-gray-500 dark:text-gray-300"
              >
                No data is present
              </td>
            </tr>
          ) : (
            currentTransactions.map((t) => (
              <tr
                key={t.id}
                className="border-b border-b-gray-200 dark:border-b-gray-600 text-sm dark:hover:bg-[#2a3648]"
              >
                <td className={`py-4 text-gray-500 dark:text-gray-300 ${role === "admin" ? "pl-2" : "pl-4"}`}>
                  {formatDate(t.date)}
                </td>

                <td className="text-base dark:text-white">{t.title}</td>

                <td>
                  <span className="bg-gray-200 dark:bg-gray-600 dark:text-white p-1 px-2 rounded-2xl">
                    {t.category}
                  </span>
                </td>

                <td>
                  <span
                    className={`${
                      t.type === "income"
                        ? "text-green-400 bg-green-100/30"
                        : "text-red-400 bg-red-100/30"
                    } px-3 py-1 rounded-full text-sm font-medium`}
                  >
                    {t.type === "income" ? "Income" : "Expense"}
                  </span>
                </td>

                <td className={`text-right ${role === "admin" ? "pr-2" : "pr-4"}`}>
                  <span
                    className={
                      t.type === "income"
                        ? "text-green-400 font-semibold"
                        : "text-red-400 font-semibold"
                    }
                  >
                    {t.type === "expense" ? "-" : "+"}₹{t.amount}
                  </span>
                </td>

                {role === "admin" && (
                  <td className="flex gap-3 py-4 justify-end pr-2">
                    <button
                      onClick={() => onEdit(t)}
                      className="text-blue-400 hover:text-blue-500 transition"
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(t.id)}
                      className="text-red-400 hover:text-red-500 transition"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Mobile */}
      <div className="sm:hidden flex flex-col gap-3">
        {transactions.length === 0 ? (
          <div className="text-center py-10 text-gray-500 dark:text-gray-300">
            No data is present
          </div>
        ) : (
          currentTransactions.map((t) => (
            <div
              key={t.id}
              className="bg-gray-100 dark:bg-[#2a3648] p-4 rounded-lg"
            >
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-300">
                <span>{formatDate(t.date)}</span>
                <span
                  className={
                    t.type === "income"
                      ? "text-green-400 font-semibold"
                      : "text-red-400 font-semibold"
                  }
                >
                  {t.type === "expense" ? "-" : "+"}₹{t.amount}
                </span>
              </div>

              <div className="mt-2 font-medium dark:text-white">
                {t.title}
              </div>

              <div className="flex justify-between items-center mt-2">
                <span className="bg-gray-200 dark:bg-gray-600 dark:text-white px-2 py-1 rounded-xl text-xs">
                  {t.category}
                </span>

                <span
                  className={`${
                    t.type === "income"
                      ? "text-green-400 bg-green-100/30"
                      : "text-red-400 bg-red-100/30"
                  } px-2 py-1 rounded-full text-xs`}
                >
                  {t.type}
                </span>
              </div>

              {role === "admin" && (
                <div className="flex justify-end gap-3 mt-3">
                  <button
                    onClick={() => onEdit(t)}
                    className="text-blue-400"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(t.id)}
                    className="text-red-400"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* ✅ Pagination Controls */}
      {transactions.length > itemsPerPage && (
        <div className="flex justify-center items-center gap-4 mt-4">
        
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded 
            bg-gray-200 text-gray-800 
            dark:bg-gray-600 dark:text-white 
            hover:bg-gray-300 dark:hover:bg-gray-500 
            disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Prev
          </button>
      
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Page {currentPage} of {totalPages}
          </span>
      
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded 
            bg-gray-200 text-gray-800 
            dark:bg-gray-600 dark:text-white 
            hover:bg-gray-300 dark:hover:bg-gray-500 
            disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Next
          </button>
      
        </div>
      )}
    </div>
  );
};

export default TransactionTable;