import React from "react";

const accentStyles = {
  orange:
    "border-orange-500 hover:shadow-[0_25px_45px_-12px_rgba(255,106,0,0.45)]",
  gray:
    "border-gray-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.18)]",
};

const DashboardCard = ({ title, subtitle, accent, onClick, disabled }) => {
  return (
    <div
      onClick={disabled ? undefined : onClick} // make clickable only if not disabled
      className={`bg-white border-l-4 ${
        accentStyles[accent]
      } rounded-2xl p-7 shadow-md transition-all duration-300
      hover:-translate-y-2 cursor-pointer h-44 flex flex-col justify-between ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <div>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
      </div>

      <span className="text-sm font-medium text-orange-500">
        View Details →
      </span>
    </div>
  );
};

export default DashboardCard;
