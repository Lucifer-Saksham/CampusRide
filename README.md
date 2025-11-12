#🚗 CampusRide – Student Carpool Platform

CampusRide is a full-stack web application that enables students to share rides, reduce travel costs, and make commuting more efficient.
It allows users to sign up, log in, offer rides, join rides, and manage their travel data securely using JWT authentication and a MongoDB Atlas cloud database.

#🌐 Hosted Links
Component	Platform	URL
##🌍 Frontend (React)	Vercel	https://campus-ride-gray.vercel.app

##⚙️ Backend (Node.js + Express)	Render	https://campusride-9i7k.onrender.com

##🗄️ Database (MongoDB Atlas)	Cloud	Connected via Mongoose ORM
#🧠 Project Overview

CampusRide solves the problem of expensive solo cab rides by letting students connect and share their rides.
Each user can offer a ride, join existing rides, or view rides offered by others — making it convenient and eco-friendly.

In this phase (Evaluation 1), the focus is on building:

User Authentication System (Signup/Login)

JWT-based Token Verification

Password Encryption with bcrypt

Connected Frontend and Backend via Axios

Deployed Full-Stack Application

🛠️ Tech Stack
Layer	Technology	Purpose
Frontend	React (Vite)	UI & Routing
Backend	Node.js + Express	API logic
Database	MongoDB Atlas	Cloud Data Storage
Authentication	JWT (JSON Web Token)	Secure login system
Password Hashing	bcrypt	Data security
API Requests	Axios	Frontend ↔ Backend communication
Deployment	Render (Backend), Vercel (Frontend)	Cloud hosting
🔐 Authentication System (Evaluation 1)
✳️ Features Implemented

User Signup & Login

JWT-based Authentication

Protected API Routes

Password Hashing with bcrypt

Token stored in localStorage (frontend)

Middleware for route protection

CORS setup for frontend-backend communication

🔧 Signup Flow

User submits signup form (name, email, password)

Backend checks if user already exists

Password is hashed using bcrypt

User is saved to MongoDB Atlas

Backend generates a JWT token and sends it to frontend

Token is stored in localStorage for session persistence

🔑 Login Flow

User enters email and password

Backend verifies user and compares password hash

If valid, JWT token is generated and returned

Token is saved on the frontend and used for further requests

🧩 Protected Routes

Axios automatically attaches JWT token to every request using an interceptor:

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


Backend verifies token before allowing access:

const jwt = require("jsonwebtoken");
const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
};

🧩 API Overview (Full CRUD Planned)
Endpoint	Method	Description
/api/auth/signup	POST	Register a new user
/api/auth/login	POST	Authenticate user and return JWT
/api/auth/profile	GET	Get logged-in user profile
/api/auth/profile	PUT	Update user profile
/api/auth/delete	DELETE	Delete user account
/api/rides	POST	Create new ride (Offer a ride)
/api/rides	GET	Get all available rides
/api/rides/:id	PUT	Update ride details
/api/rides/:id	DELETE	Delete a ride
/api/rides/:id/join	POST	Join an existing ride
⚡ Dynamic Data Handling

All frontend pages (Login, Signup, Dashboard) dynamically fetch and update data using Axios.
Each interaction (signup/login) triggers live API requests to the backend, fetching real data from MongoDB Atlas — no static content.

🧱 Project Architecture
Frontend (Vercel)
   ↓ Axios API Calls
Backend (Render, Express.js)
   ↓ Mongoose ORM
MongoDB Atlas (Cloud Database)

💡 Security Features
Feature	Description
JWT Authentication	Token-based verification for user identity
Password Hashing	bcrypt ensures passwords are unreadable
CORS	Allows only specific domains (localhost + Vercel)
Environment Variables	Securely store credentials & secret keys
🚀 Hosting Setup
Platform	Purpose	Command / Step
Render	Host backend (Express app)	Connect repo → Root directory: backend → Start: npm start
Vercel	Host frontend (React app)	Connect repo → Root directory: frontend → Build: npm run build
MongoDB Atlas	Cloud DB	Add connection string to .env
🧠 Learning Outcomes

Through this project, I learned:

How to build RESTful APIs

How JWT authentication works internally

Password encryption using bcrypt

Frontend-backend communication via Axios

Deploying full-stack projects online

Debugging hosting issues and CORS policies
