import React from "react";
import Navbar from "../components/Navbar";
import SidebarHRD from "../components/SidebarHRD";
import DashboardCard from "../components/DashboardCard";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const HRDDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <SidebarHRD />

      {/* Right Section */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="relative flex-1 px-10 py-12">
          {/* Blurred Circles (MUSTARD YELLOW) */}
          <div className="absolute top-32 right-24 w-80 h-80 bg-yellow-300 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
          <div className="absolute bottom-24 left-40 w-96 h-96 bg-yellow-200 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="mb-14">
              <h1 className="text-4xl font-bold text-yellow-700">
                Welcome, {user?.name || "HRD"}
              </h1>
              <p className="text-gray-600 mt-2">
                Review employee plans and complete yearly appraisals
              </p>
            </div>

            {/* Cards (same grid as RA & Employee) */}
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full">
                <DashboardCard
                  title="Monthly Plans"
                  subtitle="View all employees' monthly plans"
                  accent="yellow"
                  onClick={() => navigate("/hrd/monthly-plans")}
                />

                <DashboardCard
                  title="Yearly Plans"
                  subtitle="View yearly plans submitted by employees"
                  accent="yellow"
                  onClick={() => navigate("/hrd/yearly-plans")}
                />

                <DashboardCard
                  title="Yearly Appraisal"
                  subtitle="Enter final marks & remarks"
                  accent="yellow"
                  onClick={() => navigate("/hrd/yearly-appraisal")}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HRDDashboard;
