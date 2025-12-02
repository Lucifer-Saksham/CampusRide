import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function FindRide() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState({ tripType: "", status: "" });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchRides();
  }, [page, search, sort, filter]);

  const fetchRides = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      if (search) params.append("search", search);
      if (sort) params.append("sort", sort);
      if (filter.tripType) params.append("tripType", filter.tripType);
      if (filter.status) params.append("status", filter.status);

      const res = await axios.get(`/rides?${params}`);
      setRides(res.data.rides);
      setTotal(res.data.total);
    } catch (err) {
  if (process.env.NODE_ENV === 'development') console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async (rideId) => {
    try {
      const res = await axios.post(`/rides/${rideId}/join`);
      if (res.data?.ride?.status === 'completed') {
        alert("Joined ride successfully! All seats are now booked and the ride is completed.");
      } else {
        alert("Joined ride successfully");
      }
      fetchRides();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to join ride");
    }
  };

  const handleViewFare = async (rideId) => {
    try {
      const res = await axios.get(`/rides/${rideId}/fare-split`);
      const { farePerPerson, totalPeople } = res.data;
  alert(`Fare per person: ₹${farePerPerson}\nTotal people: ${totalPeople}`);
    } catch (err) {
  alert(err.response?.data?.message || "Failed to get fare split");
    }
  };

  return (
    <div className="min-h-screen gradient-bg py-6 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-2">Find a Ride</h1>
          <p className="text-gray-600 font-medium">Search for rides and join to split the fare</p>
        </div>

  <div className="bg-surface/80 backdrop-blur-sm rounded-2xl border border-gray-800/50 shadow-xl p-6 mb-6">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by pickup or destination..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full px-4 py-3 border-2 border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none text-sm bg-gray-900/30 text-gray-100 focus:bg-gray-900 font-medium"
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              className="px-4 py-3 border-2 border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none text-sm bg-gray-900/30 text-gray-100 focus:bg-gray-900 font-medium"
            >
              <option value="">Sort by</option>
              <option value="time">Time</option>
              <option value="fare">Fare</option>
              <option value="seats">Available Seats</option>
            </select>
            <select
              value={filter.tripType}
              onChange={(e) => {
                setFilter({ ...filter, tripType: e.target.value });
                setPage(1);
              }}
              className="px-4 py-3 border-2 border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none text-sm bg-gray-900/30 text-gray-100 focus:bg-gray-900 font-medium"
            >
              <option value="">All Trip Types</option>
              <option value="campus">Campus</option>
              <option value="home">Home</option>
              <option value="event">Event</option>
            </select>
            <select
              value={filter.status}
              onChange={(e) => {
                setFilter({ ...filter, status: e.target.value });
                setPage(1);
              }}
              className="px-4 py-3 border-2 border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none text-sm bg-gray-900/30 text-gray-100 focus:bg-gray-900 font-medium"
            >
              <option value="">All Status</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-3 border-gray-600 border-t-primary-500"></div>
            <p className="mt-4 text-sm text-gray-300 font-medium">Loading rides...</p>
          </div>
        ) : rides.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-xl p-16 text-center">
            <p className="text-lg text-gray-100 mb-2 font-semibold">No rides found</p>
            <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {rides.map((ride) => (
                <div key={ride._id} className="group bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-white/50 shadow-lg hover:shadow-2xl p-6 hover:-translate-y-1 transition-all">
                  <div className="flex flex-col sm:flex-row justify-between gap-5">
                    <div className="flex-1">
                      <div className="mb-4">
                        <p className="font-bold text-lg text-gray-900 mb-1">
                          {ride.pickupPoint} → {ride.destination}
                        </p>
                        <p className="text-sm text-gray-500">by {ride.creator?.name}</p>
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
                          <p className="font-bold text-brandDull text-sm">₹{((ride.totalFare || 0) / ((ride.joinedUsers?.length || 0) + 2)).toFixed(0)} (If you join)</p>
                          <p className="text-gray-400 text-xs">Total: ₹{ride.totalFare}</p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 font-medium block mb-1">Type</span>
                          <p className="font-bold text-gray-900 text-sm capitalize">{ride.tripType}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                          ride.status === 'open' ? 'bg-green-100 text-green-700' :
                          ride.status === 'closed' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {ride.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 sm:w-40">
                      {ride.status === "open" && (ride.joinedUsers?.length || 0) < ride.availableSeats && (
                        <button
                          onClick={() => handleJoin(ride._id)}
                          className="px-5 py-3 bg-gradient-to-r from-brandBright to-primary-600 text-white rounded-xl hover:from-brandBright hover:to-primary-700 font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm"
                        >
                          Join ({ride.availableSeats - (ride.joinedUsers?.length || 0)} left)
                        </button>
                      )}
                      {(ride.status === "completed" || (ride.joinedUsers?.length || 0) >= ride.availableSeats) && (
                        <button
                          disabled
                          className="px-5 py-3 bg-gray-200 text-gray-500 rounded-xl cursor-not-allowed font-bold text-sm"
                        >
                          Full
                        </button>
                      )}
                      <button
                        onClick={() => handleViewFare(ride._id)}
                        className="px-5 py-3 bg-gray-900/20 text-gray-100 border-2 border-gray-700 rounded-xl hover:border-primary-300 hover:bg-gray-900/30 font-bold transition text-sm"
                      >
                        View Fare
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-surface/80 backdrop-blur-sm rounded-xl border border-gray-800/50 shadow-lg p-4 flex justify-between items-center">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-5 py-2.5 text-sm text-gray-100 bg-gray-900/20 border-2 border-gray-700 rounded-lg hover:border-primary-300 hover:bg-gray-900/30 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed font-bold transition"
              >
                Previous
              </button>
              <span className="text-sm text-gray-300 font-semibold">Page {page} of {Math.ceil(total / limit)}</span>
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={page >= Math.ceil(total / limit)}
                className="px-5 py-2.5 text-sm text-gray-100 bg-gray-900/20 border-2 border-gray-700 rounded-lg hover:border-primary-300 hover:bg-gray-900/30 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed font-bold transition"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
