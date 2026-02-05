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

  const { evaluation, planSubmitted, achievementSubmitted, achievement } = data;
  console.log(achievement,"achievement");
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarRA />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="px-10 py-10 max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-green-600">
              Monthly Evaluation – {evaluation.month}
            </h1>
            <p className="text-gray-600">
              {evaluation.employeeId.name} ({evaluation.employeeId.employeeCode})
            </p>
          </div>

          {/* Employee Info */}
          <section className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Employee Details</h2>
            <p><strong>Name:</strong> {evaluation.employeeId.name}</p>
            <p><strong>Department:</strong> {evaluation.employeeId.department}</p>
            <p><strong>Month:</strong> {evaluation.month}</p>
          </section>

          {/* Plan */}
          <section className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Monthly Plan</h2>
            {planSubmitted ? (
              <p className="text-green-600">Plan submitted</p>
            ) : (
              <p className="text-gray-400">Not submitted</p>
            )}
          </section>

          {/* Achievement */}
          <section className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Monthly Achievement</h2>
            {achievementSubmitted ? (
              <p className="text-green-600">
                Achievement submitted
              </p>
            ) : (
              <p className="text-gray-400">Not submitted</p>
            )}
          </section>

          {/* Evaluation */}
          <section className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">RA Evaluation</h2>
            <p><strong>Status:</strong> {evaluation.score ? "Evaluated" : "Pending"}</p>

            {evaluation.score && (
              <>
                <p className="mt-2"><strong>Score:</strong> {evaluation.score}</p>
                <p className="mt-2"><strong>Remarks:</strong> {evaluation.remarks}</p>
              </>
            )}
          </section>

          {/* Back */}
          <div className="mt-8">
            <button
              onClick={() => navigate(-1)}
              className="text-blue-600 hover:underline"
            >
              ← Back to list
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MonthlyEvaluationView;
