# 🚗 CampusRide – Smart Ride-Sharing System for College Students

## 1. Project Proposal

### Project Title
CampusRide – Smart Ride-Sharing System for College Students

### Problem Statement
Many college students frequently book cabs or autos for short-distance travel to campus, hostels, nearby cafés, weekend hangouts and multiple college or social events. However, these solo rides often cost more and increase carbon emissions.

CampusRide aims to solve this by enabling students who are already booking cabs to post their ride details so that other students traveling in the same direction can join and split the fare. This makes commuting more affordable, social, and sustainable — designed specifically for verified college students.

### System Architecture
Frontend → Backend (API) → Database

Example Stack
- Frontend: React.js, React Router, Axios, TailwindCSS
- Backend: Node.js + Express
- Database: MongoDB Atlas
- Authentication: JWT-based login/signup
- Hosting:
  - Frontend: Vercel
  - Backend: Render / Railway
  - Database: MongoDB Atlas

Architecture Flow
1. A student books or plans a cab ride and posts trip details on CampusRide.
2. Other verified students can search for available rides going in the same direction.
3. Students can join the ride and split fare details are shown on-screen.
4. Backend manages authentication, ride sharing, and ride join requests.
5. Data is stored in MongoDB for all rides, users, and shared trips.

## 2. Key Features

### Authentication & Authorization
- Student signup/login using verified college email, JWT-based authentication, role-based access (ride creator vs. joiner).

### Ride Creation & Sharing
- Students can post details of an upcoming cab ride — pickup point, destination, time, available seats, and estimated cost per person.

### Ride Joining
- Other students can view available rides and request to join based on pickup/drop proximity and timing.

### CRUD Operations
- Students can create, view, update, and delete rides. Joiners can cancel or leave rides.

### Fare Split Calculator
- Automatically divides estimated total fare among joined students.

### Frontend Routing
- Pages: Home, Login/Signup, Offer Ride, Find Ride, Dashboard, Profile.

### Pagination, Searching, Sorting, Filtering
- Paginate ride lists using `?page=&limit=` parameters.
- Search rides by pickup point, destination, or time.
- Sort rides by time, fare, or available seats.
- Filter rides by trip type (campus commute, home return, event outing) and ride status (open/closed).

### Hosting & Deployment
- Fully deployed frontend and backend with public URLs and live API integration.

### Full CRUD Operations
- Students and admins can Create, Read, Update, and Delete rides and user accounts via connected APIs.

## 3. Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React.js, React Router, Axios, TailwindCSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Authentication | JWT-based login/signup, college email verification |
| AI | Ride suggestion system based on location similarity (optional/future) |
| Hosting | Vercel (frontend), Render / Railway (backend), MongoDB Atlas (DB) |

## 4. API Overview

### Authentication APIs
| Endpoint | Method | Description | Access |
|---|---:|---|---|
| /api/auth/signup | POST | Register new student (Create User) | Public |
| /api/auth/login | POST | Authenticate student and return JWT | Public |
| /api/auth/profile | GET | Get logged-in student profile | Auth |
| /api/auth/profile | PUT | Update logged-in student profile | Auth |
| /api/auth/delete | DELETE | Delete logged-in student account | Auth |

### User Management APIs
| Endpoint | Method | Description | Access |
|---|---:|---|---|
| /api/users | GET | Fetch all students (Admin only) | Admin |
| /api/users/:id | GET | Fetch student by ID | Admin |
| /api/users/:id | PUT | Update student details | Admin |
| /api/users/:id | DELETE | Remove student | Admin |

### Ride Management (Full CRUD)
| Endpoint | Method | Description | Access |
|---|---:|---|---|
| /api/rides | POST | Offer a new ride (Create) | Student |
| /api/rides | GET | Get all rides (Read) | Public |
| /api/rides/:id | GET | Get ride by ID (Read One) | Auth |
| /api/rides/:id | PUT | Update ride info (Update) | Student |
| /api/rides/:id | DELETE | Delete ride (Delete) | Student/Admin |
| /api/rides/user | GET | Get rides by logged-in student | Auth |

### Ride Join & Fare Management
| Endpoint | Method | Description | Access |
|---|---:|---|---|
| /api/rides/:id/join | POST | Join a ride | Student |
| /api/rides/:id/leave | PUT | Leave a joined ride | Student |
| /api/rides/:id/complete | PUT | Mark ride as completed | Student |
| /api/rides/:id/fare-split | GET | Calculate split fare per student | Auth |

## 5. Dynamic Data Fetching

All frontend pages (Find Ride, Offer Ride, Dashboard, and Profile) dynamically fetch and update data using REST APIs via Axios. The data displayed (rides, users, fare splits) is loaded live from MongoDB Atlas using the backend API. Users can create, edit, or delete rides, and the interface updates instantly using API responses.

## 6. Evaluation & Interview Preparation Checklist

Make sure the following are implemented and verifiable before approaching the evaluation team.

### Functional Evaluation Metrics
- Backend Functionality: Minimum 2 Create, 2 Read, 2 Update, and 2 Delete operations implemented end-to-end (auth-related CRUD does not count).
- Pagination, searching, sorting, and filtering must work through backend API calls.

### Hosting Verification
- Open hosted frontend → Inspect → Network (Fetch/XHR) → verify API responses.
- Open hosted database (MongoDB Atlas) → verify that entries are created/updated.

### Documentation Requirements
- Hosted frontend URL must be clearly mentioned in this README.
- Proposal (this document) must be included in `README.md` (done).
- Problem statement must match the implementation; evaluators will verify this.

### Interview Prep (One-to-One Discussion)
Be ready to introduce yourself and cover:
- Past experiences (internships or major projects)
- Technical skills and strengths
- Biggest challenge faced and how you solved it

### Machine Coding & JavaScript Viva
Be ready for:
- One easy JS coding problem (e.g., polyfills for map/filter/reduce, .filter() usage, deep cloning)
- One medium-level viva question (topics: `this`, Promise combinators like `Promise.all` vs `Promise.any` vs `Promise.race`)

## 7. How to Run Locally

1. Clone the repo and install dependencies:
```bash
git clone <repo-url>
cd CampusRide/backend
npm install
cd ../frontend
npm install
```

2. Start development servers:
```bash
# backend
cd backend
npm run dev

# frontend
cd frontend
npm run dev
```

3. Configure environment variables (create `.env` in `backend`):
- MONGO_URI=your_mongo_connection_string
- JWT_SECRET=your_jwt_secret
- CORS_ORIGINS=https://campus-ride-gray.vercel.app,http://localhost:5173

## 8. Hosted Links

| Component | Platform | URL |
|---|---|---|
| Frontend | Vercel | https://campus-ride-gray.vercel.app |
| Backend | Render | https://campusride-9i7k.onrender.com |
| Database | MongoDB Atlas | Connected (private) |

## 9. Notes & Next Steps

- Replace `alert()` UI with in-app toasts for better UX (recommended).
- Add E2E tests for critical flows (signup/login, offer ride, join ride).
- Consider rate-limiting and improved logging for production.

---

If you'd like, I can now:
- Add the evaluation checklist as a GitHub Issues template.
- Create a small `DEPLOYMENT.md` with step-by-step Render and Vercel deployment notes.
- Replace `alert()` calls with a toast system and wire it into the UI.

