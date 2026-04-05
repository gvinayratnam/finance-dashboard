import React from "react";

const ChartsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 container-p mb-10">

      {/* Line Chart Skeleton */}
      <div className="bg-white sm:p-5 p-3 rounded-xl dark:bg-gray-700 shadow">
        <div className="h-5 w-40 mb-4 rounded shimmer"></div>
        <div className="h-[320px] w-full rounded-xl shimmer"></div>
      </div>

      {/* Pie Chart Skeleton */}
      <div className="bg-white sm:p-5 p-3 rounded-xl dark:bg-gray-700 shadow">
        <div className="h-5 w-40 mb-4 rounded shimmer"></div>
        <div className="h-[320px] w-full rounded-xl shimmer"></div>
      </div>

    </div>
  );
};

export default ChartsSkeleton;