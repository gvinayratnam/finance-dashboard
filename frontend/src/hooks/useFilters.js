import { useState } from "react";
import { filterTransactions } from "../utils.js/calculations";

export const useFilters = (transactions) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  const filteredTransactions = filterTransactions(transactions, search, category, type);

  return { search, setSearch, category, setCategory, type, setType, filteredTransactions };
};