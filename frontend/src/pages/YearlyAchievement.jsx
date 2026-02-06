import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../api/axios";

const YearlyAchievement = () => {
  const [yearlyPlans, setYearlyPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [taskAchievement, setTaskAchievement] = useState("");
  const [additionalTasks, setAdditionalTasks] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Fetch yearly plans submitted by the user
//   useEffect(() => {
//     const fetchYearlyPlans = async () => {
//       try {
//         const res = await api.get("/employee/yearly-plan"); // adjust endpoint if needed
//         setYearlyPlans(res.data);
//         if (res.data.length > 0) {
//           setSelectedPlan(res.data[res.data.length - 1]); // default to latest plan
//         }
//       } catch (err) {
//         setError("Failed to fetch yearly plans");
//       }
//     };

//     fetchYearlyPlans();
//   }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!selectedPlan) return setError("No plan selected");

    setLoading(true);
    try {
      await api.post("/employee/yearly-achievement", {
        planId: selectedPlan._id,
        taskAchievement,
        additionalTasks,
      });

      setSuccess("Yearly achievement submitted successfully!");
      setTaskAchievement("");
      setAdditionalTasks("");
    } catch (err) {
      setError(err.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 px-10 py-10">
          <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-8">
            <h1 className="text-2xl font-semibold text-orange-600 mb-2">
              Yearly Achievement
            </h1>
            <p className="text-gray-600 mb-6">
              Review your yearly plans and submit your achievements and additional tasks
            </p>

            {error && (
              <p className="text-red-600 text-sm text-center mb-4">{error}</p>
            )}
            {success && (
              <p className="text-green-600 text-sm text-center mb-4">{success}</p>
            )}

            {/* Display yearly plans */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Yearly Plan
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={selectedPlan?._id || ""}
                onChange={(e) =>
                  setSelectedPlan(
                    yearlyPlans.find((plan) => plan._id === e.target.value)
                  )
                }
              >
                {yearlyPlans.map((plan) => (
                  <option key={plan._id} value={plan._id}>
                    {plan.financialYear}
                  </option>
                ))}
              </select>

              {selectedPlan && (
                <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-md">
                  <h2 className="font-medium text-gray-800 mb-2">
                    Plan Details:
                  </h2>
                  <p className="text-gray-700">{selectedPlan.planDetails}</p>
                </div>
              )}
            </div>

            {/* Achievement Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Task Achievement */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Task Achievement
                </label>
                <textarea
                  rows="5"
                  placeholder="Describe the tasks you achieved during the year"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={taskAchievement}
                  onChange={(e) => setTaskAchievement(e.target.value)}
                  required
                />
              </div>

              {/* Additional Tasks */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Tasks Done
                </label>
                <textarea
                  rows="5"
                  placeholder="Mention any additional responsibilities or tasks completed"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={additionalTasks}
                  onChange={(e) => setAdditionalTasks(e.target.value)}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-400 text-white py-2 rounded-md font-medium hover:opacity-90 transition disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit Achievement"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default YearlyAchievement;
