import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import logo from "../assets/okcl-logo.png";

const Register = () => {
  const navigate = useNavigate();

  const [employeeCode, setEmployeeCode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("EMPLOYEE"); 
  const [department, setDepartment] = useState("IT"); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/auth/register", {
        employeeCode,
        name,
        email,
        password,
        role,
        department,
      });

      console.log("Registration success:", res.data);

      setSuccess("Registration successful. Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#fffaf5] flex items-center justify-center overflow-hidden px-4">
      {/* Background circles */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#ff6a00] rounded-full"></div>
      <div className="absolute bottom-16 left-10 w-20 h-20 bg-[#ff6a00] rounded-full"></div>
      <div className="absolute bottom-10 left-32 w-10 h-10 bg-[#ffb703] rounded-full"></div>

      {/* Register Card */}
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-md p-6 sm:p-8">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="OKCL Logo" className="h-14 object-contain" />
        </div>

        <h2 className="text-center text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
          Create <span className="text-[#ff6a00]">Account</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          {success && <p className="text-green-600 text-sm text-center">{success}</p>}

          {/* Employee Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Employee Code
            </label>
            <input
              type="text"
              placeholder="EMP001"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6a00]"
              onChange={(e) => setEmployeeCode(e.target.value)}
              required
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Test Employee"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6a00]"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="emp@test.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6a00]"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="password123"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6a00]"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="password123"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6a00]"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6a00]"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="EMPLOYEE">Employee</option>
              <option value="MANAGER">Manager</option>
              <option value="HR">HR</option>
            </select>
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6a00]"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="FINANCE">Finance</option>
              <option value="SALES">Sales</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-gradient-to-r from-[#ff6a00] to-[#ff9f45] text-white py-2 rounded-md font-medium hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <div className="text-center mt-4 text-sm">
          <span className="text-gray-600">Already have an account?</span>{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
