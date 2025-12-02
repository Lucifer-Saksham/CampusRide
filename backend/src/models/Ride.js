const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pickupPoint: { type: String, required: true },
  destination: { type: String, required: true },
  rideTime: { type: Date, required: true },
  availableSeats: { type: Number, required: true, min: 1 },
  totalFare: { type: Number, required: true },
  tripType: { type: String, enum: ['campus', 'home', 'event'], default: 'campus' },
  status: { type: String, enum: ['open', 'closed', 'completed'], default: 'open' },
  joinedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ride', rideSchema);

