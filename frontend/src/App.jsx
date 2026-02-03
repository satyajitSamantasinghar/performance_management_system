import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import MonthlyPlan from "./pages/MonthlyPlan"; 
import MonthlyAchievement from "./pages/MonthlyAchievement";
import MonthlyReport from "./pages/MonthlyReport";
import RADashboard from "./pages/RADashboard";
import HRDDashboard from "./pages/HRDDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Employee routes */}
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route path="/employee/monthly-plan" element={<MonthlyPlan />} /> 
        <Route path="/employee/monthly-achievement" element={<MonthlyAchievement />} />
        <Route path="/employee/monthly-report" element={<MonthlyReport />} />

        {/* RA routes */}
        <Route path="/ra/dashboard" element={<RADashboard />} />

        {/* HRD routes */}
        <Route path="/hrd/dashboard" element={<HRDDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
