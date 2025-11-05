import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ maxWidth: 480, margin: "60px auto", textAlign: "center" }}>
      <h1>Welcome to CampusRide</h1>
      <p>Get started by logging in or creating an account.</p>
      <div style={{ marginTop: 20 }}>
        <Link to="/login" style={{ marginRight: 12 }}>Go to Login</Link>
        <Link to="/signup">Go to Signup</Link>
      </div>
    </div>
  );
}



