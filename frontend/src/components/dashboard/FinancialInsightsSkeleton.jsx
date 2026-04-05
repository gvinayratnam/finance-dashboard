import React from "react";

const FinancialInsightsSkeleton = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-5 mb-6">

      {/* Title */}
      <div className="h-5 w-48 bg-gray-300 dark:bg-gray-600 rounded mb-2 animate-pulse"></div>
      <div className="h-3 w-64 bg-gray-300 dark:bg-gray-600 rounded mb-4 animate-pulse"></div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 dark:bg-gray-700 p-4 rounded-xl"
          >
            {/* Icon */}
            <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded mb-3 animate-pulse"></div>

            {/* Title */}
            <div className="h-3 w-32 bg-gray-300 dark:bg-gray-600 rounded mb-2 animate-pulse"></div>

            {/* Main Value */}
            <div className="h-5 w-24 bg-gray-300 dark:bg-gray-600 rounded mb-2 animate-pulse"></div>

            {/* Sub text */}
            <div className="h-3 w-20 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default FinancialInsightsSkeleton;