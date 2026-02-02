import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import { getMonthlyPhase } from "../utils/getMonthlyPhase";
import { useAuth } from "../context/AuthContext";

const EmployeeDashboard = () => {
  const {user}=useAuth();
  const navigate = useNavigate();

  const handleMonthlyReportClick = () => {
    const phase = getMonthlyPhase();
    navigate("/employee/monthly-achievement")
  //   if (phase === "PLAN") {
  //     navigate("/employee/monthly-plan");
  //     return;
  //   }

  //   if (phase === "ACHIEVEMENT") {
  //     navigate("/employee/monthly-achievement");
  //     return;
  //   }

  //   // LOCKED phase (8–24)
  //   alert("Monthly report is locked for now.");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="flex-1 px-8 py-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-1">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Manage your appraisal reports
          </p>

          <div className="space-y-6 max-w-3xl">
            <div onClick={handleMonthlyReportClick} className="cursor-pointer">
              <DashboardCard
                title="Monthly Report"
                subtitle="Submit your monthly plan / achievement"
                accent="orange"
              />
            </div>

            <DashboardCard
              title="Quarterly Report"
              subtitle="No data available"
              accent="gray"
            />

            <DashboardCard
              title="Yearly Appraisal"
              subtitle="No submissions yet"
              accent="gray"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
