import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const MonthlyPlanView = () => {
  // later fetch planDetails from backend
  const planDetails = `1. Complete module A
2. Review PRs
3. Attend sprint meetings`;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-6 bg-orange-50 flex-1">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
            <h1 className="text-2xl font-bold text-center text-orange-600 mb-6">
              Monthly Plan (Read Only)
            </h1>

            <textarea
              value={planDetails}
              disabled
              className="w-full h-40 px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed resize-none"
            />

            <p className="text-sm text-gray-500 text-center mt-4">
              Editing is disabled during locked phase (8–24)
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MonthlyPlanView;
