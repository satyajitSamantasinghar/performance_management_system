import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/okcl-logo.png";

const SidebarRA = () => {
  const navigate = useNavigate();

  const base =
    "block px-5 py-3 rounded-md text-sm font-medium transition cursor-pointer";

  // 🔁 ONLY COLOR CHANGE
  const active =
    "bg-green-50 text-green-600";

  const inactive =
    "text-gray-600 hover:bg-gray-50";

  return (
    <div className="w-64 min-h-screen bg-white flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center">
        <img src={logo} alt="OKCL Logo" className="h-14" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        <NavLink
          to="/ra/dashboard"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
  to="/ra/monthly-evaluations"
  className={({ isActive }) =>
    `${base} ${isActive ? active : inactive}`
  }
>
  Monthly Evaluation
</NavLink>

<NavLink
  to="/ra/quarterly-evaluations"
  className={({ isActive }) =>
    `${base} ${isActive ? active : inactive}`
  }
>
  Quarterly Evaluation
</NavLink>

<NavLink
  to="/ra/yearly-appraisal"
  className={({ isActive }) =>
    `${base} ${isActive ? active : inactive}`
  }
>
  Yearly Appraisal
</NavLink>

      </nav>
    </div>
  );
};

export default SidebarRA;
