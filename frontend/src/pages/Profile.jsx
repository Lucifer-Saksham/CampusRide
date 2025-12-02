import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
  const res = await axios.get("/auth/profile");
      setUser(res.data);
      setForm({ name: res.data.name, email: res.data.email });
    } catch (err) {
  if (process.env.NODE_ENV === 'development') console.error('Fetch profile error:', err);
      setError(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    try {
  const res = await axios.put("/auth/profile", form);
      
      fetchProfile();
    } catch (err) {
  if (process.env.NODE_ENV === 'development') console.error('Update profile error:', err);
      setError(err.response?.data?.message || "Failed to update profile");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;
    try {
      await axios.delete("/auth/profile");
      localStorage.removeItem("token");
      
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete account");
    }
  };

  if (loading) {
    return (
    <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-10 w-10 border-3 border-gray-600 border-t-primary-500"></div>
          <p className="mt-4 text-sm text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
  <div className="min-h-screen gradient-bg py-6 sm:py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-100 mb-2">Profile</h1>
          <p className="text-gray-300 font-medium">Manage your account information</p>
        </div>
    <div className="bg-surface/80 backdrop-blur-sm rounded-2xl border border-gray-800/50 shadow-2xl p-8 sm:p-10">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 text-sm px-4 py-3 rounded-md mb-6">
              {error}
            </div>
          )}
          <form onSubmit={handleUpdate} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
        className="w-full px-4 py-3 border-2 border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none transition text-sm bg-gray-900/30 text-gray-100 focus:bg-gray-900 font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
        className="w-full px-4 py-3 border-2 border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none transition text-sm bg-gray-900/30 text-gray-100 focus:bg-gray-900 font-medium"
              />
            </div>
      <div className="bg-gray-900/30 p-4 rounded-xl border border-gray-800">
              <p className="text-sm text-gray-300 font-semibold">
                <span className="text-gray-500">Role:</span> <span className="capitalize text-primary-300">{user?.role}</span>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
    type="submit"
  className="flex-1 px-5 py-3.5 bg-gradient-to-r from-brandBright to-primary-600 text-white rounded-xl hover:from-brandBright hover:to-primary-700 font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm"
              >
                Update Profile
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-5 py-3.5 bg-white text-red-600 border-2 border-red-200 rounded-xl hover:border-red-300 hover:bg-red-50 font-bold transition text-sm"
              >
                Delete Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

