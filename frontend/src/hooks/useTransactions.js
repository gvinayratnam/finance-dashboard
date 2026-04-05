import { useState, useEffect } from "react";
import { getTransactions, addTransaction, updateTransaction, deleteTransaction } from "../api/api";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
  const res = await getTransactions();

  // ⏳ add delay (1 second)
  setTimeout(() => {
    setTransactions(res.data);
  }, 1000);
};

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAdd = async (formData, editId, resetForm) => {
    try {
      const data = {
        ...formData,
        amount: Number(formData.amount),
        date: formData.date || new Date().toISOString().split("T")[0],
      };

      if (editId) {
        await updateTransaction(editId, data);
      } else {
        await addTransaction(data);
      }

      resetForm();
      fetchTransactions();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const handleDelete = async (id) => {
    await deleteTransaction(id);
    fetchTransactions();
  };

  return { transactions, handleAdd, handleDelete };
};