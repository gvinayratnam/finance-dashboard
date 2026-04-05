import React from "react";
import { Select } from "antd";
import { FiChevronDown, FiSearch, FiTag, FiList } from "react-icons/fi";

const Filters = ({ setSearch, setCategory, setType }) => {
  return (
    <div className="flex flex-col gap-2 my-4 sm:px-5 px-0">
      
      
      <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
        
        {/* Search */}
        <div className="flex items-center gap-2 px-3 bg-gray-200 dark:bg-gray-700 rounded-lg sm:rounded-xl w-full sm:w-auto">
          <FiSearch className="text-gray-500 dark:text-gray-300 " />
          <input
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none py-2 text-sm w-full dark:text-white"
          />
        </div>

        
        <div className="flex gap-2 w-full sm:w-auto">
          
          {/* Category */}
          <div className="w-1/2 sm:w-auto flex items-center gap-1 bg-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700 rounded-lg sm:rounded-xl">
            <Select
              className="w-full sm:w-44"
              suffixIcon={
                <FiChevronDown className="text-gray-600 dark:text-gray-300" />
              }
              onChange={(value) => setCategory(value)}
              variant="borderless"
              dropdownMatchSelectWidth={false}
              popupClassName="custom-select-dropdown"
              placeholder="All Category"
              labelRender={({ value }) => (
                <div className="flex items-center gap-2 py-1 px-1">
                  <FiTag className="text-indigo-400" />
                  <span className="capitalize dark:text-white">
                    {value || "All Categories"}
                  </span>
                </div>
              )}
              options={[
                {
                  value: "",
                  label: (
                    <div>
                      <p className="font-medium">All Categories</p>
                    </div>
                  ),
                },
                {
                  value: "Shopping",
                  label: (
                    <div>
                      <p className="font-medium">Shopping</p>
                    </div>
                  ),
                },
                {
                  value: "Food",
                  label: (
                    <div>
                      <p className="font-medium">Food</p>
                    </div>
                  ),
                },
                {
                  value: "Utilities",
                  label: (
                    <div>
                      <p className="font-medium">Utilities</p>
                    </div>
                  ),
                },
                {
                  value: "Entertainment",
                  label: (
                    <div>
                      <p className="font-medium">Entertainment</p>
                    </div>
                  ),
                },
                {
                  value: "Healthcare",
                  label: (
                    <div>
                      <p className="font-medium">Healthcare</p>
                    </div>
                  ),
                },
                {
                  value: "Transport",
                  label: (
                    <div>
                      <p className="font-medium">Transport</p>
                    </div>
                  ),
                },
              ]}
            />
          </div>

          {/* Type */}
          <div className="w-1/2 sm:w-auto flex items-center gap-1 bg-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700 rounded-lg sm:rounded-xl">
            <Select
              className="w-full sm:w-40"
              suffixIcon={
                <FiChevronDown className="text-gray-600 dark:text-gray-300" />
              }
              onChange={(value) => setType(value)}
              variant="borderless"
              dropdownMatchSelectWidth={false}
              popupClassName="custom-select-dropdown"
              placeholder="All Type"
              labelRender={({ value }) => (
                <div className="flex items-center gap-2 py-1 px-1">
                  <FiList className="text-indigo-400" />
                  <span className="capitalize dark:text-white">
                    {value || "All Types"}
                  </span>
                </div>
              )}
              options={[
                {
                  value: "",
                  label: (
                    <div>
                      <p className="font-medium">All Types</p>
                      <p className="text-xs text-gray-400">
                        Income and Expense
                      </p>
                    </div>
                  ),
                },
                {
                  value: "income",
                  label: (
                    <div>
                      <p className="font-medium">Income</p>
                      <p className="text-xs text-gray-400">
                        Money received
                      </p>
                    </div>
                  ),
                },
                {
                  value: "expense",
                  label: (
                    <div>
                      <p className="font-medium">Expense</p>
                      <p className="text-xs text-gray-400">
                        Money spent
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Filters;