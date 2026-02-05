import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../api/axios";

const YearlyPlan = () => {
  const [financialYear, setFinancialYear] = useState("");
  const [planDetails, setPlanDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.post("/employee/yearly-plan", {
        financialYear,
        planDetails,
      });

      setSuccess("Yearly plan submitted successfully");
      setPlanDetails("");
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
              Yearly Plan
            </h1>

            <p className="text-gray-600 mb-6">
              Submit your yearly goals and objectives for the financial year
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <p className="text-red-600 text-sm text-center">{error}</p>
              )}

              {success && (
                <p className="text-green-600 text-sm text-center">{success}</p>
              )}

              {/* Financial Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Financial Year
                </label>
                <input
                  type="text"
                  placeholder="2025-2026"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={financialYear}
                  onChange={(e) => setFinancialYear(e.target.value)}
                  required
                />
              </div>

              {/* Plan Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Yearly Plan Details
                </label>
                <textarea
                  rows="6"
                  placeholder="Describe your goals, targets, and responsibilities for the year"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={planDetails}
                  onChange={(e) => setPlanDetails(e.target.value)}
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-400 text-white py-2 rounded-md font-medium hover:opacity-90 transition disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit Yearly Plan"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default YearlyPlan;
