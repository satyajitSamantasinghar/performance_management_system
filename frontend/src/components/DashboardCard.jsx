import React from "react";

const DashboardCard = ({ title, subtitle, accent, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl shadow-md p-6 border-l-4 border-${accent}-600 
        hover:shadow-lg transition cursor-pointer`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") onClick();
      }}
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 text-sm">
        {subtitle}
      </p>

      <p className="mt-4 text-orange-500 font-medium">
        View Details →
      </p>
    </div>
  );
};

export default DashboardCard;
