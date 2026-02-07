import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import SidebarRA from "../../components/SidebarRA";
import { getMonthlyEvaluationById } from "../../api/ra";

const MonthlyEvaluationView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMonthlyEvaluationById(id)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="p-10 text-gray-500">Loading evaluation...</p>;
  }

  const { evaluation, plan, achievement, status } = data;
  console.log(achievement,"achievement");
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarRA />

      <div className="flex-1 flex flex-col">
        <Navbar />
<main className="px-4 md:px-8 py-8 max-w-6xl mx-auto">
  {/* Header */}
  <div className="mb-8">
    <h1 className="text-2xl md:text-3xl font-bold text-green-700">
      Monthly Evaluation
    </h1>
    <p className="text-gray-500 mt-1">
      {evaluation.month}
    </p>
  </div>

  {/* Grid Layout */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

    {/* LEFT COLUMN */}
    <div className="lg:col-span-2 space-y-6">

      {/* Employee Details */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-lg font-semibold mb-4">Employee Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <p><span className="font-medium">Name:</span> {evaluation.employeeId.name}</p>
          <p><span className="font-medium">Department:</span> {evaluation.employeeId.department}</p>
          <p><span className="font-medium">Employee Code:</span> {evaluation.employeeId.employeeCode}</p>
          <p><span className="font-medium">Month:</span> {evaluation.month}</p>
        </div>
      </div>

      {/* Monthly Plan */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Monthly Plan</h2>
          <span className={`text-xs px-3 py-1 rounded-full ${
            status.planSubmitted
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}>
            {status.planSubmitted ? "Submitted" : "Not Submitted"}
          </span>
        </div>

        {plan ? (
          <p className="text-gray-700 text-sm leading-relaxed">
            {plan.planDetails}
          </p>
        ) : (
          <p className="text-gray-400 text-sm">No plan available</p>
        )}
      </div>

      {/* Monthly Achievement */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Monthly Achievement</h2>
          <span className={`text-xs px-3 py-1 rounded-full ${
            status.achievementSubmitted
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}>
            {status.achievementSubmitted ? "Submitted" : "Not Submitted"}
          </span>
        </div>

        {achievement ? (
          <p className="text-gray-700 text-sm leading-relaxed">
            {achievement.achievementDetails}
          </p>
        ) : (
          <p className="text-gray-400 text-sm">No achievement available</p>
        )}
      </div>

    </div>

    {/* RIGHT COLUMN */}
    <div className="space-y-6">

      {/* RA Evaluation */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-lg font-semibold mb-4">RA Evaluation</h2>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-medium">Status:</span>
          <span className={`text-xs px-3 py-1 rounded-full ${
            evaluation.score
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}>
            {evaluation.score ? "Evaluated" : "Pending"}
          </span>
        </div>

        {evaluation.score && (
          <div className="text-sm space-y-2">
            <p><span className="font-medium">Score:</span> {evaluation.score}</p>
            <p><span className="font-medium">Remarks:</span> {evaluation.remarks}</p>
          </div>
        )}
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="w-full text-center text-blue-600 text-sm hover:underline"
      >
        ← Back to Monthly Evaluations
      </button>
    </div>
  </div>
</main>

      </div>
    </div>
  );
};

export default MonthlyEvaluationView;
