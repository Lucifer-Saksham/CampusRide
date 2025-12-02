import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    
    if (name === "password") {
      if (value.length > 0 && value.length < 6) {
        setPasswordError("Password must be at least 6 characters long");
      } else {
        setPasswordError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPasswordError("");

    
    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    if (form.password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      const res = await axios.post("/auth/signup", form);
  localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Signup error details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          statusText: err.response?.statusText,
          config: err.config
        });
      }
      const errorMessage = err.response?.data?.message || err.message || "Signup failed. Please check your connection and try again.";
      
      if (err.message === 'Network Error' || err.code === 'ERR_NETWORK' || err.code === 'ERR_CONNECTION_REFUSED') {
        setError("Cannot connect to server. Please make sure the backend server is running on port 5050.");
      } else {
        setError(errorMessage);
      }
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-surface/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-800/50 p-8 sm:p-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-gray-100 mb-2">Join CampusRide</h2>
          <p className="text-gray-300">Start sharing rides and saving money</p>
        </div>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 text-sm px-4 py-3 rounded-md mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">Full Name</label>
            <input
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none transition text-sm bg-gray-900/30 text-gray-100 focus:bg-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">Email</label>
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
              placeholder="At least 6 characters"
              value={form.password}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none transition text-sm bg-gray-900/30 text-gray-100 focus:bg-gray-900 ${
                passwordError ? 'border-red-300' : 'border-gray-200'
              }`}
            />
            {passwordError && (
              <p className="mt-1 text-xs text-red-600 font-medium">{passwordError}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">Must be at least 6 characters</p>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-brandBright to-primary-600 text-white py-3.5 rounded-xl font-bold hover:from-brandBright hover:to-primary-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm"
          >
            Create Account
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-primary-300 hover:text-primary-200 font-bold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
