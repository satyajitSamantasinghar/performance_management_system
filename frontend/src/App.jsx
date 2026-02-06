import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

import EmployeeDashboard from "./pages/EmployeeDashboard";
import MonthlyPlan from "./pages/MonthlyPlan";
import MonthlyAchievement from "./pages/MonthlyAchievement";
import YearlyPlan from "./pages/YearlyPlan";

import HRDDashboard from "./pages/HRDDashboard";
import MDDashboard from "./pages/MDDashboard";
import RADashboard from "./pages/ra/RADashboard";

import MonthlyEvaluationList from "./pages/ra/MonthlyEvaluationList";
import MonthlyEvaluationView from "./pages/ra/MonthlyEvaluationView";

import ProtectedRoute from "./routes/ProtectedRoute";
import RoleProtectedRoute from "./routes/RoleProtectedRoute";
import YearlyAchievement from "./pages/YearlyAchievement";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Employee */}
        <Route
          path="/employee/dashboard"
          element={
            <ProtectedRoute>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/monthly-plan"
          element={
            <ProtectedRoute>
              <MonthlyPlan />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/monthly-achievement"
          element={
            <ProtectedRoute>
              <MonthlyAchievement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/yearly-plan"
          element={
            <ProtectedRoute>
              <YearlyPlan />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/yearly-achievement"
          element={
            <ProtectedRoute>
              <YearlyAchievement />
            </ProtectedRoute>
          }
        />

        {/* RA */}
        <Route
          path="/ra/dashboard"
          element={
            <RoleProtectedRoute allowedRoles={["RA"]}>
              <RADashboard />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/ra/monthly-evaluations"
          element={
            <RoleProtectedRoute allowedRoles={["RA"]}>
              <MonthlyEvaluationList />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/ra/monthly-evaluations/view/:id"
          element={
            <RoleProtectedRoute allowedRoles={["RA"]}>
              <MonthlyEvaluationView />
            </RoleProtectedRoute>
          }
        />

        {/* HRD */}
        <Route
          path="/hrd/dashboard"
          element={
            <RoleProtectedRoute allowedRoles={["HRD"]}>
              <HRDDashboard />
            </RoleProtectedRoute>
          }
        />

        {/* MD */}
        <Route
          path="/md/dashboard"
          element={
            <RoleProtectedRoute allowedRoles={["MD"]}>
              <MDDashboard />
            </RoleProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
