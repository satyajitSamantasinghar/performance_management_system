import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import SidebarRA from "../../components/SidebarRA";
import {
  getMonthlyEvaluationById,
  submitMonthlyEvaluation
} from "../../api/ra";

const MonthlyEvaluationEvaluate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [score, setScore] = useState("");
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getMonthlyEvaluationById(id)
      .then((res) => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async () => {
    if (!score) {
      alert("Score is required");
      return;
    }

    setSubmitting(true);

    try {
      await submitMonthlyEvaluation({
        evaluationId: id,
        score,
        remarks
      });

      navigate(`/ra/monthly-review/view/${id}`);
    } catch (err) {
      alert(err.response?.data?.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className="p-10 text-gray-500">Loading...</p>;
  }

  const { evaluation } = data;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarRA />
      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="px-10 py-10 max-w-5xl">
          <h1 className="text-3xl font-bold text-green-600 mb-6">
            Evaluate – {evaluation.month}
          </h1>

          {/* Employee Info */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <p><strong>Employee:</strong> {evaluation.employeeId.name}</p>
            <p><strong>Code:</strong> {evaluation.employeeId.employeeCode}</p>
            <p><strong>Department:</strong> {evaluation.employeeId.department}</p>
          </div>

          {/* Plan */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="font-semibold mb-2">Monthly Plan</h2>
            <p className="text-gray-600">
              {evaluation.monthlyPlanId
                ? "Plan submitted"
                : "Not submitted"}
            </p>
          </div>

          {/* Achievement */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="font-semibold mb-2">Monthly Achievement</h2>
            <p className="text-gray-600">
              {evaluation.monthlyAchievementId
                ? "Achievement submitted"
                : "Not submitted"}
            </p>
          </div>

          {/* Evaluation Form */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="font-semibold mb-4">Evaluation</h2>

            <label className="block mb-2 text-sm font-medium">
              Score
            </label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2 mb-4"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              min="0"
              max="100"
            />

            <label className="block mb-2 text-sm font-medium">
              Remarks
            </label>
            <textarea
              className="w-full border rounded px-3 py-2 mb-4"
              rows="4"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              {submitting ? "Submitting..." : "Submit Evaluation"}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MonthlyEvaluationEvaluate;
