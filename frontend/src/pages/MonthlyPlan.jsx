import React, { useEffect, useState } from "react";
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

  // 🔥 Multi-line plans
  const [plans, setPlans] = useState([""]);
  const [existingPlan, setExistingPlan] = useState(null);

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔹 Fetch existing plan for this month
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await api.get(
          `/employee/monthly-plans?month=${currentMonth}`
        );

        if (res.data.length > 0) {
          setExistingPlan(res.data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch monthly plan");
      } finally {
        setPageLoading(false);
      }
    };

    fetchPlan();
  }, [currentMonth]);

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
      await api.post("/employee/monthly-plan", {
        month: currentMonth,
        planDetails
      });

      // 🔄 Refetch to lock UI
      const res = await api.get(
        `/employee/monthly-plans?month=${currentMonth}`
      );
      setExistingPlan(res.data[0]);
    } catch (err) {
      if (err.response?.status === 409) {
        setError("Monthly plan already submitted for this month");
      } else {
        setError("Submission failed");
      }
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

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
              {currentMonth}
            </p>

            {/* Error Message */}
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md p-3 text-center">
                {error}
              </div>
            )}

            {/* 🔒 Already Submitted */}
            {existingPlan ? (
              <div className="border rounded-lg p-4 bg-green-50">
                <p className="font-semibold mb-3 text-green-700 text-center">
                  ✔ Monthly plan already submitted
                </p>

                <ul className="list-decimal ml-6 space-y-2">
                  {existingPlan.planDetails
                    .split(/\d+\.\s*/)
                    .filter((item) => item.trim() !== "")
                    .map((item, idx) => (
                      <li key={idx}>{item.trim()}</li>
                    ))}
                </ul>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Month */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Month
                  </label>
                  <input
                    type="month"
                    value={currentMonth}
                    disabled
                    className="w-full px-4 py-2 border rounded-md bg-gray-100"
                  />
                </div>

                {/* Plan Lines */}
                <div>
                  <label className="block text-sm font-medium mb-2">
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
                          className="flex-1 px-3 py-2 border rounded-md"
                        />

                        {index === plans.length - 1 && (
                          <button
                            type="button"
                            onClick={addPlanLine}
                            className="p-2 rounded-md bg-orange-100 text-orange-600"
                          >
                            <FiPlus />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    disabled={loading || isAfterDeadline}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 rounded-lg font-semibold disabled:opacity-60"
                  >
                    {loading ? "Submitting..." : "Submit Monthly Plan"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MonthlyPlan;
