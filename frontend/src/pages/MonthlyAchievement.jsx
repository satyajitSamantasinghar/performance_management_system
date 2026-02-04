import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const MonthlyAchievement = () => {
  const { user } = useAuth();

  const [monthlyPlan, setMonthlyPlan] = useState(null);
  const [achievementDetails, setAchievementDetails] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ current month in YYYY-MM format
  const currentMonth = new Date().toISOString().slice(0, 7);

  // 🔹 Fetch CURRENT MONTH plan only
  useEffect(() => {
    const fetchMonthlyPlan = async () => {
      try {
        const res = await api.get(
          `/employee/monthly-plans?month=${currentMonth}`
        );

        if (res.data && res.data.length > 0) {
          setMonthlyPlan(res.data[0]); // only one plan per month
        } else {
          setMonthlyPlan(null);
        }
      } catch (error) {
        console.error("Error fetching monthly plan:", error);
        setMonthlyPlan(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyPlan();
  }, []);

  // 🔹 Submit achievement
  const handleSubmit = async () => {
    if (!monthlyPlan) {
      alert("No monthly plan found for this month");
      return;
    }

    if (!achievementDetails.trim()) {
      alert("Please write your achievement details");
      return;
    }

    try {
      await api.post("/employee/monthly-achievement", {
        monthlyPlanId: monthlyPlan._id,
        achievementDetails,
      });

      alert("Monthly achievement submitted successfully");
      setAchievementDetails("");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to submit achievement");
      console.error("Submission failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8 bg-[#fff6ec] min-h-screen">
          <div className="bg-white rounded-xl p-6 max-w-4xl mx-auto shadow">
            <h2 className="text-center text-2xl font-bold text-orange-600 mb-6">
              Monthly Achievement
            </h2>

            {/* 🔹 Logged-in User Info */}
            <div className="bg-[#ffedd5] p-4 rounded mb-6">
              <p className="font-semibold text-lg">{user?.name}</p>
              <p className="text-sm text-gray-700">Role: {user?.role}</p>
              <p className="text-sm text-gray-700">Email: {user?.email}</p>
            </div>

            {!monthlyPlan ? (
              <p className="text-center text-gray-500">
                No monthly plan found for {currentMonth}
              </p>
            ) : (
              <>
                {/* 🔹 Monthly Plan Display */}
                <div className="border rounded p-4 mb-4">
                  <p className="font-semibold mb-2">
                    Month: {monthlyPlan.month}
                  </p>

                  {/* ✅ Proper plan list (down by down) */}
                  <ul className="list-decimal ml-6 space-y-2">
                    {monthlyPlan.planDetails
                      .split(/\d+\.\s*/)
                      .filter(item => item.trim() !== "")
                      .map((item, index) => (
                        <li key={index}>{item.trim()}</li>
                      ))}
                  </ul>
                </div>

                {/* 🔹 Achievement Input */}
                <textarea
                  className="w-full border rounded p-3 mb-4"
                  placeholder="Write your achievement details..."
                  value={achievementDetails}
                  onChange={(e) => setAchievementDetails(e.target.value)}
                />

                <div className="text-center">
                  <button
                    onClick={handleSubmit}
                    className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
                  >
                    Submit Achievement
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyAchievement;
