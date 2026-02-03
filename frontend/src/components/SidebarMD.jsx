import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/okcl-logo.png";

const MDSidebar = () => {
  const base =
    "block px-5 py-3 rounded-md text-sm font-medium transition cursor-pointer";

  const active = "bg-blue-50 text-blue-600";
  const inactive = "text-gray-600 hover:bg-gray-50";

  return (
    <div className="w-64 min-h-screen bg-white flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center">
        <img src={logo} alt="OKCL Logo" className="h-14" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        <NavLink
          to="/md/dashboard"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/md/review-submissions"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          Review Submissions
        </NavLink>

        <NavLink
          to="/md/approvals"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          Approvals
        </NavLink>

        <NavLink
          to="/md/yearly-appraisal"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          Yearly Appraisal
        </NavLink>
      </nav>
    </div>
  );
};

export default MDSidebar;
