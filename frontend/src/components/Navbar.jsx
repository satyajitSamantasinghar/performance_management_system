import React from "react";
import { FiSearch, FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="h-16 w-full bg-white flex items-center px-6 shadow-sm">
      {/* Left: Search */}
      <div className="relative w-72">
        <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
        <input
          type="text"
          placeholder="Search projects"
          className="w-full pl-10 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* Right: User + Logout */}
      <div className="ml-auto flex items-center gap-4">
        {/* Display the logged-in employee's name */}
        <span className="text-sm text-gray-600">
          {user ? user.name : "Employee"}
        </span>

        {/* Initials circle */}
        <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-semibold">
          {user ? user.name.charAt(0).toUpperCase() : "E"}
        </div>

        {/* Logout button */}
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition"
        >
          <FiLogOut />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
