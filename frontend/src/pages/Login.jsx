import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }

    try {
  const res = await axios.post("/auth/login", form);
  localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
  if (process.env.NODE_ENV === 'development') console.error('Login error:', err);
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-surface/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-800/50 p-8 sm:p-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-gray-100 mb-2">Welcome back</h2>
          <p className="text-gray-300">Let's get you back on the road</p>
        </div>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 text-sm px-4 py-3 rounded-md mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              name="email"
              type="email"
              placeholder="you@college.edu"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none transition text-sm bg-gray-900/30 text-gray-100 focus:bg-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none transition text-sm bg-gray-900/30 text-gray-100 focus:bg-gray-900"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-brandBright to-primary-600 text-white py-3.5 rounded-xl font-bold hover:from-brandBright hover:to-primary-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm"
          >
            Sign In
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary-300 hover:text-primary-200 font-bold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
