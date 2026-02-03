import React from "react";
import Navbar from "../components/Navbar";
import SidebarRA from "../components/SidebarRA";
import DashboardCard from "../components/DashboardCard";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const RADashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <SidebarRA />

      {/* Right Section */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="relative flex-1 px-10 py-12">
          {/* Blurred Circles (GREEN) */}
          <div className="absolute top-32 right-24 w-80 h-80 bg-green-300 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
          <div className="absolute bottom-24 left-40 w-96 h-96 bg-green-200 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="mb-14">
              <h1 className="text-4xl font-bold text-green-600">
                Welcome, {user?.name || "Reporting Authority"}
              </h1>
              <p className="text-gray-600 mt-2">
                Review and evaluate employee performance reports
              </p>
            </div>

            {/* Cards (IN A LINE, SAME GRID) */}
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full">
                <DashboardCard
                  title="Monthly Evaluation"
                  subtitle="Review plans & achievements, enter marks"
                  accent="green"
                  onClick={() => navigate("/ra/monthly-review")}
                />

                <DashboardCard
                  title="Quarterly Evaluation"
                  subtitle="View quarterly averages & remarks"
                  accent="green"
                  onClick={() => navigate("/ra/quarterly-review")}
                />

                <DashboardCard
                  title="Yearly Appraisal"
                  subtitle="Final yearly performance review"
                  accent="green"
                  onClick={() => navigate("/ra/yearly-review")}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RADashboard;
