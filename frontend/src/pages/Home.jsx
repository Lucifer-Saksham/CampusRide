import { Link } from "react-router-dom";

export default function Home() {
  const token = localStorage.getItem("token");
  
  return (
  <div className="min-h-screen gradient-bg">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-gray-100 mb-2 tracking-tight">
              Campus<span className="gradient-text">Ride</span>
            </h1>
          </div>
          <p className="text-2xl sm:text-3xl text-gray-200 mb-4 font-bold">
            Split rides. Save cash. Make friends.
          </p>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The ride-sharing app built for students. Find your crew, split the fare, and get where you need to go.
          </p>
        </div>

        {token ? (
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
            <Link
              to="/find-ride"
              className="group px-8 py-4 bg-gradient-to-r from-brandBright to-primary-600 text-white text-lg font-semibold rounded-xl hover:from-brandBright hover:to-primary-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Find a Ride
            </Link>
            <Link
              to="/offer-ride"
              className="group px-8 py-4 bg-gray-900/30 text-gray-100 text-lg font-semibold rounded-xl border-2 border-gray-800 hover:border-primary-300 hover:bg-gray-900/50 transition-all shadow-md hover:shadow-lg"
            >
              Offer a Ride
            </Link>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
            <Link
              to="/login"
              className="group px-8 py-4 bg-gradient-to-r from-brandBright to-primary-600 text-white text-lg font-semibold rounded-xl hover:from-brandBright hover:to-primary-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="group px-8 py-4 bg-gray-900/30 text-gray-100 text-lg font-semibold rounded-xl border-2 border-gray-800 hover:border-primary-300 hover:bg-gray-900/50 transition-all shadow-md hover:shadow-lg"
            >
              Get Started
            </Link>
          </div>
        )}

        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              💰
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Save Money</h3>
            <p className="text-gray-600 leading-relaxed">Cut your travel costs in half by splitting fares with other students. More rides, less spending.</p>
          </div>
          <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              🌱
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Go Green</h3>
            <p className="text-gray-600 leading-relaxed">Reduce your carbon footprint. Every shared ride makes campus a little greener.</p>
          </div>
          <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
            <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              👥
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Meet People</h3>
            <p className="text-gray-600 leading-relaxed">Turn your commute into a social experience. Connect with students going your way.</p>
          </div>
        </div>
      </div>
    </div>
  );
}



