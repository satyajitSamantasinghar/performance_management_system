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

            {/* Status Section */}
            <div className="mt-12 max-w-6xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm p-6 relative overflow-hidden">

                {/* Thin Accent Bar */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-orange-400 to-orange-600"></div>

                {/* Header */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Your Current Status
                  </h2>
                  <p className="text-gray-500 text-xs mt-1">
                    Monthly submission overview
                  </p>
                </div>

                {/* Status Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Monthly Plan */}
                  <div className="rounded-lg border p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-gray-700">
                        Monthly Plan
                      </h3>
                      <span className="text-[10px] font-medium text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
                        Required
                      </span>
                    </div>

                    <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold bg-orange-500 text-white">
                      Submitted
                    </span>
                  </div>

                  {/* Monthly Achievement */}
                  <div className="rounded-lg border p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-gray-700">
                        Monthly Achievement
                      </h3>
                      <span className="text-[10px] font-medium text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
                        In Progress
                      </span>
                    </div>

                    <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold border border-orange-500 text-orange-600 bg-orange-50">
                      Pending
                    </span>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
