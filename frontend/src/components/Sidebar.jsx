import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/okcl-logo.png";
import { getMonthlyPhase } from "../utils/getMonthlyPhase";
import { getYearlyPhase } from "../utils/getYearlyPhase";

const Sidebar = () => {
  const navigate = useNavigate();

  const base =
    "block px-5 py-3 rounded-md text-sm font-medium transition cursor-pointer";

  const active =
    "bg-orange-50 text-orange-600";

  const inactive =
    "text-gray-600 hover:bg-gray-50";

  // 📅 Monthly logic
  const handleMonthlyReportClick = () => {
    const phase = getMonthlyPhase();

    if (phase === "PLAN") {
      navigate("/employee/monthly-plan");
      return;
    }

    if (phase === "ACHIEVEMENT") {
      navigate("/employee/monthly-achievement");
      return;
    }

    alert("Monthly report is locked right now.");
  };

  // 📆 Yearly logic
  const handleYearlyAppraisalClick = () => {
    const phase = getYearlyPhase();

    // if (phase === "PLAN") {
      navigate("/employee/yearly-plan");
    //   return;
    // }

    // if (phase === "ACHIEVEMENT") {
    //   navigate("/employee/yearly-achievement");
    //   return;
    // }

    // alert("Yearly appraisal is not open right now.");
  };

  return (
    <div className="w-64 min-h-screen bg-white flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center">
        <img src={logo} alt="OKCL Logo" className="h-14" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        {/* Dashboard */}
        <NavLink
          to="/employee/dashboard"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          Dashboard
        </NavLink>

        {/* Monthly Report */}
        <div
          onClick={handleMonthlyReportClick}
          className={`${base} ${inactive}`}
        >
          Monthly Report
        </div>

        {/* Quarterly Report */}
        <NavLink
          to="/employee/quarterly"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          Quarterly Report
        </NavLink>

        {/* Yearly Appraisal */}
        <div
          onClick={handleYearlyAppraisalClick}
          className={`${base} ${inactive}`}
        >
          Yearly Appraisal
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
