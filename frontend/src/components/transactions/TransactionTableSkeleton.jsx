import React from "react";

const TransactionTableSkeleton = ({ role }) => {
  return (
    <div className="bg-white dark:bg-gray-700 px-4 sm:px-8 py-5 rounded-xl mt-6 overflow-x-auto shadow">

      {/* Desktop Skeleton */}
      <div className="hidden sm:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-b-gray-300 dark:border-b-gray-600">
              {["Date", "Desc", "Cat", "Type", "Amount", role === "admin" && "Actions"]
                .filter(Boolean)
                .map((_, i) => (
                  <th key={i} className="py-4">
                    <div className="h-4 w-20 shimmer rounded"></div>
                  </th>
                ))}
            </tr>
          </thead>

          <tbody>
            {[1,2,3,4,5].map((_, i) => (
              <tr key={i} className="border-b border-b-gray-200 dark:border-b-gray-600">
                
                <td className="py-4"><div className="h-4 w-20 shimmer rounded"></div></td>
                <td><div className="h-4 w-32 shimmer rounded"></div></td>
                <td><div className="h-6 w-20 shimmer rounded-full"></div></td>
                <td><div className="h-6 w-20 shimmer rounded-full"></div></td>
                <td className="text-right"><div className="h-4 w-20 ml-auto shimmer rounded"></div></td>

                {role === "admin" && (
                  <td className="text-right">
                    <div className="h-4 w-16 ml-auto shimmer rounded"></div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Skeleton */}
      <div className="sm:hidden flex flex-col gap-3">
        {[1,2,3].map((_, i) => (
          <div key={i} className="bg-gray-100 dark:bg-[#2a3648] p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <div className="h-3 w-20 shimmer rounded"></div>
              <div className="h-3 w-16 shimmer rounded"></div>
            </div>

            <div className="h-4 w-40 shimmer rounded mb-2"></div>

            <div className="flex justify-between">
              <div className="h-4 w-20 shimmer rounded"></div>
              <div className="h-4 w-16 shimmer rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionTableSkeleton;