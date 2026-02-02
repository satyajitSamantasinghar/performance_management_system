import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import logo from "../assets/okcl-logo.png";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    const { accessToken, role, name } = res.data;

    login(accessToken, { name, role });

    navigate("/employee/dashboard");
  } catch (err) {
    console.error(err);
    setError(err.response?.data?.message || "Login failed");
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

      {/* Login Card */}
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-md p-6 sm:p-8">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="OKCL Logo" className="h-14 object-contain" />
        </div>

        {/* Title */}
        <h2 className="text-center text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
          Performance <span className="text-[#ff6a00]">Appraisal</span> Report System
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="emp@test.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6a00]"
              value={email}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-gradient-to-r from-[#ff6a00] to-[#ff9f45] text-white py-2 rounded-md font-medium hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Links */}
        <div className="flex justify-between mt-4 text-sm">
          <Link to="/register" className="text-blue-600 hover:underline">
            Don&apos;t have an account?
          </Link>

          <span className="text-blue-600 cursor-pointer hover:underline">
            Forgot password?
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
