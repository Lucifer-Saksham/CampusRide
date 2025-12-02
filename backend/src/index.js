require('dotenv').config();    
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const rideRoutes = require('./routes/rideRoutes');

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
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
