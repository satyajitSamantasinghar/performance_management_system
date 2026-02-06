import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [monthlyPlanSubmitted, setMonthlyPlanSubmitted] = useState(false);
  const [monthlyAchievementSubmitted, setMonthlyAchievementSubmitted] =
    useState(false);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchStatus = async () => {
    try {
      const currentMonth = new Date().toISOString().slice(0, 7);

      // Monthly Plan
      const planRes = await api.get("/employee/monthly-plans", {
        params: { month: currentMonth }
      });

      if (planRes.data.length > 0) {
        setMonthlyPlanSubmitted(true);

        const planId = planRes.data[0]._id;

        // Monthly Achievement
        const achRes = await api.get("/employee/monthly-achievements", {
          params: { monthlyPlanId: planId }
        });

        if (achRes.data.length > 0) {
          setMonthlyAchievementSubmitted(true);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); 
    }
  };

  fetchStatus();
}, []);


  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="relative flex-1 px-10 py-10">
          {/* Background Effects */}
          <div className="absolute top-32 right-24 w-72 h-72 bg-orange-300 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
          <div className="absolute bottom-24 left-32 w-80 h-80 bg-orange-200 rounded-full blur-3xl opacity-40 pointer-events-none"></div>

          <div className="relative z-10">
            {/* Header */}
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-orange-600">
                Welcome, {user?.name || "Employee"}
              </h1>
              <p className="text-gray-600 mt-1">
                Track and manage your performance submissions
              </p>
            </div>

            {/* Dashboard Cards */}
            <div className="flex justify-center mb-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
                <DashboardCard
                  title="Monthly Report"
                  subtitle="Plan & achievements"
                  onClick={() =>
                    navigate("/employee/monthly-achievement")
                  }
                  accent="orange"
                />

                <DashboardCard
                  title="Quarterly Report"
                  subtitle="Coming soon"
                  disabled
                />

                <DashboardCard
                  title="Yearly Appraisal"
                  subtitle="Plan and achievements"
                  onClick={()=>
                    navigate("/employee/yearly-achievement")
                  }
                  accent="orange"
                />
              </div>
            </div>

            {/* Status Section */}
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Submission Status
                </h2>

                {loading ? (
                  <p className="text-gray-500 text-sm">Loading status...</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Monthly Plan Status */}
                    <div className="border rounded-lg p-5 flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Monthly Plan
                      </span>
                      <span
                        className={`px-4 py-1 rounded-full text-xs font-semibold ${monthlyPlanSubmitted
                            ? "bg-orange-500 text-white"
                            : "bg-orange-100 text-orange-600"
                          }`}
                      >
                        {monthlyPlanSubmitted
                          ? "Submitted"
                          : "Pending"}
                      </span>
                    </div>

                    {/* Monthly Achievement Status */}
                    <div className="border rounded-lg p-5 flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Monthly Achievement
                      </span>
                      <span
                        className={`px-4 py-1 rounded-full text-xs font-semibold ${monthlyAchievementSubmitted
                            ? "bg-orange-500 text-white"
                            : "border border-orange-500 text-orange-600 bg-orange-50"
                          }`}
                      >
                        {monthlyAchievementSubmitted
                          ? "Submitted"
                          : "Pending"}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
