import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
  <nav className="bg-surface/80 backdrop-blur-md border-b border-gray-700/30 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-black text-gray-100 hover:opacity-80 transition">
            Campus<span className="gradient-text">Ride</span>
          </Link>
          <div className="flex gap-3 sm:gap-5 items-center">
            {token ? (
              <>
                <Link to="/find-ride" className="text-sm text-gray-200 hover:text-primary-300 font-semibold transition hidden sm:block">
                  Find Ride
                </Link>
                <Link to="/offer-ride" className="text-sm text-gray-200 hover:text-primary-300 font-semibold transition hidden sm:block">
                  Offer Ride
                </Link>
                <Link to="/dashboard" className="text-sm text-gray-200 hover:text-primary-300 font-semibold transition">
                  Dashboard
                </Link>
                <Link to="/profile" className="text-sm text-gray-200 hover:text-primary-300 font-semibold transition">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-gray-200 hover:text-white font-semibold transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm text-gray-200 hover:text-primary-300 font-semibold transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 text-sm bg-gradient-to-r from-brandBright to-primary-600 text-white rounded-lg hover:from-brandBright hover:to-primary-700 transition font-semibold shadow-md"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
