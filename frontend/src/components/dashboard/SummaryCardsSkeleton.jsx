import React from "react";

const SummaryCardsSkeleton = () => {
  return (
    <div className="container-p grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      
      {[1, 2, 3].map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-700 px-6 py-4 rounded-xl 
          shadow-[0_0_10px_rgba(0,0,0,0.10)] border border-gray-200 dark:border-gray-600"
        >
          <div className="flex justify-between items-center">
            
            {/* Text Section */}
            <div className="flex flex-col gap-3 w-full">
              
              <div className="h-3 w-24 bg-gray-300 dark:bg-gray-600 rounded 
              animate-pulse"></div>

              <div className="h-6 w-32 bg-gray-300 dark:bg-gray-600 rounded 
              animate-pulse"></div>
            
            </div>

            {/* Icon Placeholder */}
            <div className="h-12 w-12 bg-gray-300 dark:bg-gray-600 rounded-xl 
            animate-pulse"></div>

          </div>
        </div>
      ))}

    </div>
  );
};

export default SummaryCardsSkeleton;