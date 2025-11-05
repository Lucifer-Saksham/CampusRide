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
    <nav style={{ padding: "10px", background: "#f8f9fa" }}>
      <Link to="/signup" style={{ marginRight: 10 }}>Signup</Link>
      <Link to="/login" style={{ marginRight: 10 }}>Login</Link>
      {token && (
        <>
          <Link to="/dashboard" style={{ marginRight: 10 }}>Dashboard</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
}
