import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import SidebarRA from "../../components/SidebarRA";
import { useNavigate } from "react-router-dom";
import { getMonthlyEvaluations } from "../../api/ra";

const MonthlyEvaluationList = () => {
  const navigate = useNavigate();
  const [evaluations, setEvaluations] = useState([]);
  console.log(evaluations,"evaluations");
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMonthlyEvaluations()
      .then((res) => {
        setEvaluations(res.data);
      })
      .catch((err) => {
        console.error("Error fetching evaluations", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarRA />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="px-10 py-10">
          <h1 className="text-3xl font-bold text-green-600 mb-6">
            Monthly Evaluations
          </h1>

          {loading ? (
            <p className="text-gray-500">Loading evaluations...</p>
          ) : evaluations.length === 0 ? (
            <p className="text-gray-500">No evaluations found.</p>
          ) : (
            <div className="bg-white rounded-xl shadow overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b text-gray-600 text-sm">
                    <th className="text-left py-4 px-6">Employee</th>
                    <th className="text-left py-4 px-6">Month</th>
                    <th className="text-left py-4 px-6">Plan</th>
                    <th className="text-left py-4 px-6">Achievement</th>
                    <th className="text-left py-4 px-6">Status</th>
                    <th className="text-left py-4 px-6">Action</th>
                  </tr>
                </thead>
{/* 
                <tbody>
                  {evaluations.map((ev) => {
                    const evaluated = ev.status === "Evaluated";

                    return (
                      <tr
                        key={ev._id}
                        className="border-b hover:bg-gray-50 transition"
                      >
                        <td className="py-4 px-6">
                          {ev.employeeId?.name}
                        </td>

                        <td className="py-4 px-6">{ev.month}</td>

                        <td className="py-4 px-6">
                          {ev.planSubmitted ? (
                            <span className="text-green-600 font-medium">
                              Submitted
                            </span>
                          ) : (
                            <span className="text-gray-400">
                              Not Submitted
                            </span>
                          )}
                        </td>

                        <td className="py-4 px-6">
                          {ev.achievementSubmitted ? (
                            <span className="text-green-600 font-medium">
                              Submitted
                            </span>
                          ) : (
                            <span className="text-gray-400">
                              Not Submitted
                            </span>
                          )}
                        </td>

                        <td className="py-4 px-6">
                          {evaluated ? (
                            <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                              Evaluated
                            </span>
                          ) : (
                            <span className="px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">
                              Pending
                            </span>
                          )}
                        </td>

                        <td className="py-4 px-6">
                          {evaluated ? (
                            <button
                              className="text-blue-600 hover:underline font-medium"
                              onClick={() =>
                                navigate(
                                  `/ra/monthly-review/view/${ev._id}`
                                )
                              }
                            >
                              View
                            </button>
                          ) : (
                            <button
                              className="text-green-600 hover:underline font-medium"
                              onClick={() =>
                                navigate(
                                  `/ra/monthly-review/${ev._id}`
                                )
                              }
                            >
                              Evaluate
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody> */
                <tbody>
  {evaluations.map((ev) => (
    
    <tr key={ev._id} className="border-b hover:bg-gray-50">
      <td className="py-4 px-6">{ev.employeeId?.name}</td>
      <td className="py-4 px-6">{ev.month}</td>

      {/* PLAN */}
      <td className="py-4 px-6">
        {ev.planSubmitted ? (
          <span className="text-green-600 font-medium">Submitted</span>
        ) : (
          <span className="text-gray-400">Not Submitted</span>
        )}
      </td>

      {/* ACHIEVEMENT */}
      <td className="py-4 px-6">
        {ev.achievementSubmitted ? (
          <span className="text-green-600 font-medium">Submitted</span>
        ) : (
          <span className="text-gray-400">Not Submitted</span>
        )}
      </td>

      {/* STATUS */}
      <td className="py-4 px-6">
        {ev.status === "Evaluated" ? (
          <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
            Evaluated
          </span>
        ) : (
          <span className="px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">
            Pending
          </span>
        )}
      </td>

      {/* ACTION */}
      <td className="py-4 px-6">
        {ev.status === "Evaluated" ? (
          <button
            className="text-blue-600 hover:underline font-medium"
            onClick={() =>
              navigate(`/ra/monthly-evaluations/view/${ev._id}`)
            }
          >
            View
          </button>
        ) : (
          <button
            className="text-green-600 hover:underline font-medium"
            onClick={() =>
              navigate(`/ra/monthly-review/${ev._id}`)
            }
          >
            Evaluate
          </button>
        )}
      </td>
    </tr>
  ))}
</tbody>
}
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MonthlyEvaluationList;
