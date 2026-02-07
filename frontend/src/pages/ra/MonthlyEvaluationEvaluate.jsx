import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import SidebarRA from "../../components/SidebarRA";
import {
  getMonthlyEvaluationById,
  submitMonthlyEvaluation
} from "../../api/ra";
import { toast } from "react-toastify";

const MonthlyEvaluationEvaluate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [score, setScore] = useState("");
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // 1️⃣ Fetch evaluation data
  useEffect(() => {
    getMonthlyEvaluationById(id)
      .then((res) => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  // 2️⃣ Auto-redirect if already evaluated (SRS rule)
  useEffect(() => {
    if (data?.status?.evaluated) {
      navigate(`/ra/monthly-evaluations/view/${id}`);
    }
  }, [data, id, navigate]);

  // 3️⃣ Submit handler
  const handleSubmit = async () => {
    if (!score) {
      toast.error("Score is required");
      return;
    }

    setSubmitting(true);

    try {
      await submitMonthlyEvaluation({
        evaluationId: id,
        score,
        remarks
      });

      toast.success("Evaluation submitted successfully");
      setShowConfirm(false);

      setTimeout(() => {
        navigate(`/ra/monthly-evaluations/view/${id}`);
      }, 700);
    } catch (err) {
      toast.error(err.response?.data?.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  // 4️⃣ Loading state
  if (loading) {
    return <p className="p-10 text-gray-500">Loading...</p>;
  }

  const { evaluation, plan, achievement, status } = data;

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
            <p><strong>ID:</strong> {evaluation.employeeId.employeeCode}</p>
            <p><strong>Department:</strong> {evaluation.employeeId.department}</p>
          </div>

          {/* Monthly Plan */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="font-semibold mb-2">Monthly Plan</h2>
            {plan ? (
              <>
                <p className="font-medium">Plan Details:</p>
                <p>{plan.planDetails}</p>
              </>
            ) : (
              <p className="text-gray-500">Not submitted</p>
            )}
          </div>

          {/* Monthly Achievement */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="font-semibold mb-2">Monthly Achievement</h2>
            {achievement ? (
              <>
                <p className="font-medium">Achievement Details:</p>
                <p>{achievement.achievementDetails}</p>
              </>
            ) : (
              <p className="text-gray-500">Not submitted</p>
            )}
          </div>

          {/* Evaluation Form */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="font-semibold mb-4">Evaluation</h2>

            <label className="block mb-2">Score</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2 mb-4"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              min="0"
              max="100"
            />

            <label className="block mb-2">Remarks</label>
            <textarea
              className="w-full border rounded px-3 py-2 mb-4"
              rows="4"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />

            <button
              onClick={() => setShowConfirm(true)}
              disabled={submitting || status.evaluated}
              className={`px-6 py-2 rounded text-white ${
                status.evaluated
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {status.evaluated ? "Already Evaluated" : "Submit Evaluation"}
            </button>
          </div>

          {/* Confirm Modal */}
          {showConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 max-w-md w-full">
                <h3 className="font-semibold mb-4">Confirm Submission</h3>
                <p className="text-sm mb-6 text-gray-600">
                  This action cannot be undone.
                </p>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MonthlyEvaluationEvaluate;
