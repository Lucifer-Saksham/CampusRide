import { useState } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function OfferRide() {
  const [form, setForm] = useState({
    pickupPoint: "",
    destination: "",
    rideTime: "",
    availableSeats: "",
    totalFare: "",
    tripType: "campus"
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
  const response = await axios.post("/rides", {
        ...form,
        availableSeats: parseInt(form.availableSeats),
        totalFare: parseFloat(form.totalFare)
      });
      
      navigate("/dashboard");
    } catch (err) {
  if (process.env.NODE_ENV === 'development') console.error('Create ride error:', err);
      setError(err.response?.data?.message || "Failed to create ride");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg py-6 sm:py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-2">Offer a Ride</h1>
          <p className="text-gray-600 font-medium">Share your ride and let others join to split the fare</p>
        </div>
  <div className="bg-surface/80 backdrop-blur-sm rounded-2xl border border-gray-800/50 shadow-2xl p-8 sm:p-10">
          {error && (
              <div className="bg-red-900/60 border-l-4 border-red-700 text-red-300 text-sm px-4 py-3 rounded-md mb-6">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-200 mb-2">Pickup Point</label>
              <input
                name="pickupPoint"
                value={form.pickupPoint}
                onChange={handleChange}
                required
                  className="w-full px-4 py-3 border-2 border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none transition text-sm bg-gray-900/30 text-gray-100 focus:bg-gray-900 font-medium"
                placeholder="Where are you starting from?"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-200 mb-2">Destination</label>
              <input
                name="destination"
                value={form.destination}
                onChange={handleChange}
                required
                  className="w-full px-4 py-3 border-2 border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none transition text-sm bg-gray-900/30 text-gray-100 focus:bg-gray-900 font-medium"
                placeholder="Where are you going?"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-200 mb-2">Ride Time</label>
              <input
                name="rideTime"
                type="datetime-local"
                value={form.rideTime}
                onChange={handleChange}
                required
                  className="w-full px-4 py-3 border-2 border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none transition text-sm bg-gray-900/30 text-gray-100 focus:bg-gray-900 font-medium"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-gray-200 mb-2">Available Seats</label>
                <input
                  name="availableSeats"
                  type="number"
                  min="1"
                  value={form.availableSeats}
                  onChange={handleChange}
                  required
                    className="w-full px-4 py-3 border-2 border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none transition text-sm bg-gray-900/30 text-gray-100 focus:bg-gray-900 font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-200 mb-2">Total Fare (₹)</label>
                <input
                  name="totalFare"
                  type="number"
                  min="0"
                  value={form.totalFare}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none transition text-sm bg-gray-900/30 text-gray-100 focus:bg-gray-900 font-medium"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-200 mb-2">Trip Type</label>
              <select
                name="tripType"
                value={form.tripType}
                onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none transition text-sm bg-gray-900/30 text-gray-100 focus:bg-gray-900 font-medium"
              >
                <option value="campus">Campus Commute</option>
                <option value="home">Home Return</option>
                <option value="event">Event Outing</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
                className="w-full bg-gradient-to-r from-brandBright to-primary-600 text-white py-4 rounded-xl font-black hover:from-brandBright hover:to-primary-700 disabled:bg-gray-400 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm"
            >
              {loading ? "Creating..." : "Create Ride"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

