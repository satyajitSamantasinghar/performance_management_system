import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Right Section */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="relative flex-1 px-10 py-12">
          {/* Blurred Circles */}
          <div className="absolute top-32 right-24 w-80 h-80 bg-orange-300 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
          <div className="absolute bottom-24 left-40 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="mb-14">
              <h1 className="text-4xl font-bold text-orange-600">
                Welcome, {user?.name || "Employee"}
              </h1>
              <p className="text-gray-600 mt-2">
                Track and submit your performance reports
              </p>
            </div>

            {/* Cards */}
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full">
                <DashboardCard
                  title="Monthly Report"
                  subtitle="Submit your monthly plan & achievements"
                  onClick={() => navigate("/employee/monthly-achievement")}
                  accent="orange"
                />

                <DashboardCard
                  title="Quarterly Report"
                  subtitle="Coming soon"
                  disabled
                />

                <DashboardCard
                  title="Yearly Appraisal"
                  subtitle="Coming soon"
                  disabled
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
