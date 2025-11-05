require('dotenv').config();    
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://campus-ride-gray.vercel.app/"],
  credentials: true,
}));
app.use(express.json()); 

connectDB(process.env.MONGO_URI);

app.use('/api/auth', authRoutes); 

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
