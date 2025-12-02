import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      const res = await axios.get("/rides/user");
      setRides(res.data);
    } catch (err) {
  if (process.env.NODE_ENV === 'development') console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (rideId) => {
    if (!window.confirm("Are you sure you want to delete this ride?")) return;
    try {
      await axios.delete(`/rides/${rideId}`);
      
      fetchRides();
    } catch (err) {
      
    }
  };

  const handleComplete = async (rideId) => {
    try {
      await axios.put(`/rides/${rideId}/complete`);
      
      fetchRides();
    } catch (err) {
      
    }
  };

  return (
    <div className="min-h-screen gradient-bg py-6 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-100 mb-2">My Rides</h1>
          <p className="text-gray-300 font-medium">Manage your offered rides</p>
        </div>
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-3 border-gray-600 border-t-primary-500"></div>
            <p className="mt-4 text-sm text-gray-300 font-medium">Loading your rides...</p>
          </div>
        ) : rides.length === 0 ? (
          <div className="bg-surface/80 backdrop-blur-sm rounded-2xl border border-gray-800/50 shadow-xl p-16 text-center">
            <p className="text-lg text-gray-100 mb-4 font-semibold">You haven't created any rides yet</p>
            <button
              onClick={() => navigate("/offer-ride")}
              className="px-6 py-3 bg-gradient-to-r from-brandBright to-primary-600 text-white rounded-xl hover:from-brandBright hover:to-primary-700 font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm"
            >
              Create Your First Ride
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {rides.map((ride) => (
              <div key={ride._id} className="group bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-white/50 shadow-lg hover:shadow-2xl p-6 hover:-translate-y-1 transition-all">
                <div className="flex flex-col sm:flex-row justify-between gap-5">
                  <div className="flex-1">
                    <div className="mb-4">
                      <p className="font-bold text-lg text-gray-900 mb-1">
                        {ride.pickupPoint} → {ride.destination}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div>
                        <span className="text-xs text-gray-500 font-medium block mb-1">Time</span>
                        <p className="font-bold text-gray-900 text-sm">{new Date(ride.rideTime).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 font-medium block mb-1">Seats</span>
                        <p className="font-bold text-gray-900 text-sm">
                          {1 + (ride.joinedUsers?.length || 0)}/{1 + ride.availableSeats}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 font-medium block mb-1">Fare per person</span>
                        <p className="font-bold text-brandDull text-sm">₹{((ride.totalFare || 0) / ((ride.joinedUsers?.length || 0) + 1)).toFixed(0)}</p>
                        <p className="text-gray-400 text-xs">Total: ₹{ride.totalFare}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 font-medium block mb-1">Joined</span>
                        <p className="font-bold text-gray-900 text-sm">{ride.joinedUsers?.length || 0} people</p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                        ride.status === 'open' ? 'bg-green-100 text-green-700' :
                        ride.status === 'closed' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {ride.status}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gray-800 text-primary-300 capitalize">
                        {ride.tripType}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 sm:w-40">
                    {ride.status !== "completed" && (
                      <button
                        onClick={() => handleComplete(ride._id)}
                        className="px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm"
                      >
                        Mark Complete
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(ride._id)}
                      className="px-5 py-3 bg-white text-red-600 border-2 border-red-200 rounded-xl hover:border-red-300 hover:bg-red-50 font-bold transition text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
