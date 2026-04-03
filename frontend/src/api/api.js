import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/transactions/";


export const getTransactions = () => axios.get(BASE_URL);


export const addTransaction = (data) =>
  axios.post(BASE_URL, data);

export const updateTransaction = (id, data) =>
  axios.put(`http://127.0.0.1:8000/api/transactions/${id}/`, data);

export const deleteTransaction = (id) =>
  axios.delete(`${BASE_URL}${id}/`);