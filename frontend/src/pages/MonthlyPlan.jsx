import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { FiPlus } from "react-icons/fi";

const MonthlyPlan = () => {
  const navigate = useNavigate();

  // Auto-set current month (YYYY-MM)
  const currentMonth = new Date().toISOString().slice(0, 7);

  // Date logic (frontend validation)
  const today = new Date();
  const currentDay = today.getDate();
  const isAfterDeadline = currentDay > 7;

  // 🔥 Multiple plan lines instead of textarea
  const [plans, setPlans] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePlanChange = (index, value) => {
    const updated = [...plans];
    updated[index] = value;
    setPlans(updated);
  };

  const addPlanLine = () => {
    setPlans([...plans, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isAfterDeadline) {
      setError(
        "Monthly plan submission is allowed only till the 7th day of the month."
      );
      return;
    }

    setLoading(true);

    // ✅ Convert multiple plans into ONE string
    const planDetails = plans
      .filter((p) => p.trim() !== "")
      .map((p, i) => `${i + 1}. ${p}`)
      .join("\n");

    try {
      // await api.post("/employee/monthly-plan", {
      //   month: currentMonth,
      //   planDetails,
      // });

      navigate("/employee/dashboard");
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

        <main className="p-6 bg-orange-50 flex-1">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
            <h1 className="text-2xl font-bold text-center text-orange-600 mb-2">
              Monthly Plan
            </h1>
            <p className="text-sm text-gray-500 text-center mb-6">
              Submit your work plan for{" "}
              <span className="font-medium text-gray-700">
                {currentMonth}
              </span>
            </p>

            {/* Error Message */}
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md p-3 text-center">
                {error}
              </div>
            )}

            {/* Deadline Info */}
            {isAfterDeadline && (
              <div className="mb-4 bg-orange-50 border border-orange-200 text-orange-700 text-sm rounded-md p-3 text-center">
                Submission window closed (after 7th of the month)
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Month */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Month
                </label>
                <input
                  type="month"
                  value={currentMonth}
                  disabled
                  className="w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed text-gray-600"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Month is auto-selected and cannot be changed
                </p>
              </div>

              {/* Monthly Plan Lines */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Plan
                </label>

                <div className="space-y-3">
                  {plans.map((plan, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 border border-orange-200 rounded-lg p-3"
                    >
                      <input
                        type="text"
                        value={plan}
                        onChange={(e) =>
                          handlePlanChange(index, e.target.value)
                        }
                        required
                        placeholder={`Plan item ${index + 1}`}
                        className="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
                      />

                      {index === plans.length - 1 && (
                        <button
                          type="button"
                          onClick={addPlanLine}
                          className="p-2 rounded-md bg-orange-100 text-orange-600 hover:bg-orange-200 transition"
                          title="Add another plan"
                        >
                          <FiPlus />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={loading || isAfterDeadline}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 rounded-lg font-semibold transition disabled:opacity-60"
                >
                  {isAfterDeadline
                    ? "Submission Closed"
                    : loading
                      ? "Submitting..."
                      : "Submit Monthly Plan"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MonthlyPlan;
