import React from "react";
import Navbar from "../../components/Navbar";
import SidebarRA from "../../components/SidebarRA";
import DashboardCard from "../../components/DashboardCard";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMonthlyEvaluations } from "../../api/ra";




const RADashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [monthlyEvaluations, setMonthlyEvaluations] = useState([]);
  useEffect(() => {
  getMonthlyEvaluations()
    .then((res) => {
      setMonthlyEvaluations(res.data);
    })
    .catch((err) => {
      console.error("Error fetching monthly evaluations", err);
    });
}, []);



  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <SidebarRA />

      {/* Right Section */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="relative flex-1 px-10 py-12">
          {/* Blurred Circles (GREEN) */}
          <div className="absolute top-32 right-24 w-80 h-80 bg-green-300 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
          <div className="absolute bottom-24 left-40 w-96 h-96 bg-green-200 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="mb-14">
              <h1 className="text-4xl font-bold text-green-600">
                Welcome, {user?.name || "Reporting Authority"}
              </h1>
              <p className="text-gray-600 mt-2">
                Review and evaluate employee performance reports
              </p>
            </div>

            {/* Cards (IN A LINE, SAME GRID) */}
            <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full">
                  <DashboardCard
  title="Monthly Evaluation"
  subtitle="Review plans & achievements, enter marks"
  accent="green"
  onClick={() => navigate("/ra/monthly-evaluations")}
 />

<DashboardCard
  title="Quarterly Evaluation"
  subtitle="View quarterly averages & remarks"
  accent="green"
  onClick={() => navigate("/ra/quarterly-evaluations")}
 />


                <DashboardCard
                  title="Yearly Appraisal"
                  subtitle="Final yearly performance review"
                  accent="green"
                  onClick={() => navigate("/ra/yearly-review")}
                />
              </div>
            </div>
            {/* Monthly Evaluation List */}
<div className="mt-20 bg-white rounded-xl shadow p-6 max-w-6xl mx-auto">
  <h2 className="text-2xl font-semibold text-gray-800 mb-6">
    Monthly Evaluations
  </h2>

  {monthlyEvaluations.length === 0 ? (
    <p className="text-gray-500">No evaluations found.</p>
  ) : (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b text-gray-600">
          <th className="text-left py-3">Employee</th>
          <th className="text-left py-3">Month</th>
          <th className="text-left py-3">Status</th>
          <th className="text-left py-3">Action</th>
        </tr>
      </thead>

      <tbody>
        {monthlyEvaluations.map((ev) => (
          <tr key={ev._id} className="border-b hover:bg-gray-50">
            <td className="py-3">{ev.employeeId?.name}</td>
            <td className="py-3">{ev.month}</td>

            {/* STATUS COLUMN */}
<td className="py-3">
  {ev.score ? (
    <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
      Evaluated
    </span>
  ) : (
    <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">
      Pending
    </span>
  )}
</td>

{/* ACTION COLUMN */}
<td className="py-3">
  {ev.score ? (
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
    </table>
  )}
</div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default RADashboard;
