import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const MonthlyAchievement = () => {
  const { user } = useAuth();

  const [monthlyPlan, setMonthlyPlan] = useState(null);
  const [existingAchievement, setExistingAchievement] = useState(null);
  const [achievementDetails, setAchievementDetails] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // current month YYYY-MM
  const currentMonth = new Date().toISOString().slice(0, 7);

  // 🔹 Fetch monthly plan + achievement
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1️⃣ Get current month plan
        const planRes = await api.get(
          `/employee/monthly-plans?month=${currentMonth}`
        );

        if (planRes.data.length === 0) {
          setMonthlyPlan(null);
          setLoading(false);
          return;
        }

        const plan = planRes.data[0];
        setMonthlyPlan(plan);

        // 2️⃣ Get achievement for this plan
        const achRes = await api.get(
          `/employee/monthly-achievements?monthlyPlanId=${plan._id}`
        );

        if (achRes.data.length > 0) {
          setExistingAchievement(achRes.data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentMonth]);

  // 🔹 Submit achievement
  const handleSubmit = async () => {
    if (!achievementDetails.trim()) {
      setError("Please write your achievement details");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await api.post("/employee/monthly-achievement", {
        monthlyPlanId: monthlyPlan._id,
        achievementDetails
      });

      // 🔄 Refetch achievement to lock UI
      const res = await api.get(
        `/employee/monthly-achievements?monthlyPlanId=${monthlyPlan._id}`
      );
      setExistingAchievement(res.data[0]);
      setAchievementDetails("");
    } catch (err) {
      setError(err.response?.data?.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
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

            {/* User Info */}
            <div className="bg-[#ffedd5] p-4 rounded mb-6">
              <p className="font-semibold text-lg">{user?.name}</p>
              <p className="text-sm text-gray-700">Role: {user?.role}</p>
              <p className="text-sm text-gray-700">Email: {user?.email}</p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 p-3 rounded text-center">
                {error}
              </div>
            )}

            {!monthlyPlan ? (
              <p className="text-center text-gray-500">
                No monthly plan found for {currentMonth}
              </p>
            ) : (
              <>
                {/* Monthly Plan */}
                <div className="border rounded p-4 mb-4">
                  <p className="font-semibold mb-2">
                    Month: {monthlyPlan.month}
                  </p>

                  <ul className="list-decimal ml-6 space-y-2">
                    {monthlyPlan.planDetails
                      .split(/\d+\.\s*/)
                      .filter((item) => item.trim() !== "")
                      .map((item, index) => (
                        <li key={index}>{item.trim()}</li>
                      ))}
                  </ul>
                </div>

                {/* 🔒 Already Submitted */}
                {existingAchievement ? (
                  <div className="border rounded p-4 bg-green-50">
                    <p className="font-semibold text-green-700 mb-2 text-center">
                      ✔ Achievement already submitted
                    </p>
                    <p className="text-gray-800 whitespace-pre-line">
                      {existingAchievement.achievementDetails}
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Achievement Input */}
                    <textarea
                      className="w-full border rounded p-3 mb-4"
                      placeholder="Write your achievement details..."
                      value={achievementDetails}
                      onChange={(e) =>
                        setAchievementDetails(e.target.value)
                      }
                    />

                    <div className="text-center">
                      <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 disabled:opacity-60"
                      >
                        {submitting
                          ? "Submitting..."
                          : "Submit Achievement"}
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyAchievement;
