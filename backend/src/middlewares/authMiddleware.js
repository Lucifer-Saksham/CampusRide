const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (process.env.NODE_ENV === 'development') console.log('Auth header:', authHeader);
    const token = authHeader?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET not set');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (process.env.NODE_ENV === 'development') console.log('Decoded token:', decoded);
    const user = await User.findById(decoded.id);
    if (!user) {
      if (process.env.NODE_ENV === 'development') console.log('User not found for ID:', decoded.id);
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
  if (process.env.NODE_ENV === 'development') console.log('User authenticated:', user.email);
  next();
  } catch (err) {
  console.error('Auth error:', err.message);
  res.status(401).json({ message: 'Invalid token' });
  }
};

const admin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

module.exports = { auth, admin };

