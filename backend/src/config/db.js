const mongoose = require('mongoose');

const connectDB = async (mongoUri) => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  if (process.env.NODE_ENV === 'development') console.log('MongoDB connected');
  } catch (err) {
  console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
