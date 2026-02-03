import React from "react";
import Navbar from "../components/Navbar";
import SidebarMD from "../components/SidebarMD";
import DashboardCard from "../components/DashboardCard";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MDDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <SidebarMD />

      {/* Right Section */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="relative flex-1 px-10 py-12">
          {/* Blurred Circles */}
          <div className="absolute top-32 right-24 w-80 h-80 bg-blue-300 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
          <div className="absolute bottom-24 left-40 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="mb-14">
              <h1 className="text-4xl font-bold text-blue-600">
                Welcome, {user?.name || "Managing Director"}
              </h1>
              <p className="text-gray-600 mt-2">
                Review, approve, and evaluate organization-wide performance
              </p>
            </div>

            {/* Cards */}
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full">
                <DashboardCard
                  title="Review Submissions"
                  subtitle="View all monthly & yearly plans"
                  accent="blue"
                  onClick={() => navigate("/md/review-submissions")}
                />

                <DashboardCard
                  title="Approvals"
                  subtitle="Approve or reject employee plans"
                  accent="blue"
                  onClick={() => navigate("/md/approvals")}
                />

                <DashboardCard
                  title="Yearly Appraisal"
                  subtitle="Final appraisal & remarks"
                  accent="blue"
                  onClick={() => navigate("/md/yearly-appraisal")}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MDDashboard;
