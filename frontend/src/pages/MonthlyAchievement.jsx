import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

const MonthlyAchievement = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [achievements, setAchievements] = useState([]);
  const [monthlyPlanId, setMonthlyPlanId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      //
      try {
        const res = await api.get("/employee/monthly-plan", {
          employeeId: user?.id, 
        });

        const plan = res.data;

        if (plan && plan.tasks?.length > 0) {
          setMonthlyPlanId(plan._id);

          setAchievements(
            plan.tasks.map((task) => ({
              taskId: task._id,
              taskTitle: task.title, 
              status: "",
            }))
          );
        } else {
          console.warn("No tasks found in the monthly plan.");
        }
      } catch (err) {
        console.error("Failed to fetch monthly plan:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchPlan();
  }, [user]);

  const handleStatusChange = (index, value) => {
    const updated = [...achievements];
    updated[index].status = value;
    setAchievements(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!monthlyPlanId) {
      alert("Monthly Plan ID not found.");
      return;
    }

    try {
      await api.post("/employee/monthly-achievement", {
        planId: monthlyPlanId, 
        achievements: achievements.map((a) => ({
          taskId: a.taskId,
          status: a.status,
        })),
      });

      navigate("/employee/dashboard");
    } catch (err) {
      console.error("Error submitting achievements:", err);
      alert("Failed to submit achievements.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading monthly plan...</p>
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
            <h1 className="text-2xl font-bold text-center text-orange-600 mb-6">
              Monthly Achievement
            </h1>

            {/* Employee Info */}
            <div className="flex justify-between bg-orange-100 p-4 rounded-lg mb-6">
              <div>
                <p className="font-semibold">{user?.name}</p>
                <p className="text-sm text-gray-700">{user?.role}</p>
              </div>
            </div>

            {/* Achievement Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {achievements.map((item, index) => (
                <div
                  key={item.taskId}
                  className="flex justify-between gap-3 border border-orange-200 rounded-lg p-3"
                >
                  <p>{item.taskTitle}</p>

                  <select
                    className="border border-orange-300 rounded px-3 py-1"
                    value={item.status}
                    onChange={(e) =>
                      handleStatusChange(index, e.target.value)
                    }
                    required
                  >
                    <option value="">Select status</option>
                    <option value="Completed">Completed</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              ))}

              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 rounded-lg font-semibold"
                >
                  Submit Achievement
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MonthlyAchievement;
