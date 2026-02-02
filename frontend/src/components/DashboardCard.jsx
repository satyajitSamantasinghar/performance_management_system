import React from "react";

const accentStyles = {
  orange: "border-orange-400 hover:shadow-orange-200",
  gray: "border-gray-300 hover:shadow-gray-200",
};

const DashboardCard = ({ title, subtitle, accent }) => {
  return (
    <div
      className={`cursor-pointer bg-white border-l-4 ${
        accentStyles[accent]
      } rounded-xl p-6 shadow-sm hover:shadow-lg transition duration-200 h-40 flex flex-col justify-between`}
    >
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>

      <div className="text-sm font-medium text-orange-500">
        View Details →
      </div>
    </div>
  );
};

export default DashboardCard;
