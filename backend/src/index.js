require('dotenv').config();    
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const rideRoutes = require('./routes/rideRoutes');

const app = express();
// Default allowed origins: include deployed frontend on Vercel plus local dev
const allowedOrigins = (process.env.CORS_ORIGINS || 'https://campus-ride-gray.vercel.app,http://localhost:5173,http://localhost:3000')
  .split(',')
  .map(s => s.trim());

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
    return callback(new Error(msg), false);
  },
  credentials: true
}));
app.use(express.json()); 

app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'development') console.log(`${req.method} ${req.path}`, req.body);
  next();
});

if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI not set in .env file');
}

if (!process.env.JWT_SECRET) {
  console.error('❌ JWT_SECRET not set in .env file');
}

connectDB(process.env.MONGO_URI);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/rides', rideRoutes);

const PORT = 5050;
app.listen(PORT, () => {
  if (process.env.NODE_ENV === 'development') console.log(`Server running on port ${PORT}`);
});
