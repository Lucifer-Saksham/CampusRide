const Ride = require('../models/Ride');

const createRide = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') console.log('Create ride request:', req.body, 'User:', req.user?.email || req.user?._id);
    const { pickupPoint, destination, rideTime, availableSeats, totalFare, tripType } = req.body;
    if (!pickupPoint || !destination || !rideTime || !availableSeats || !totalFare) {
      return res.status(400).json({ message: 'All fields required' });
    }
    const ride = await Ride.create({
      creator: req.user._id,
      pickupPoint,
      destination,
      rideTime: new Date(rideTime),
      availableSeats: parseInt(availableSeats),
      totalFare: parseFloat(totalFare),
      tripType: tripType || 'campus'
    });
    const populatedRide = await Ride.findById(ride._id).populate('creator', 'name email');
    res.status(201).json(populatedRide);
  } catch (err) {
  if (process.env.NODE_ENV === 'development') console.error('Create ride error:', err);
    res.status(500).json({ message: err.message });
  }
};

const getAllRides = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, sort, filter, tripType, status } = req.query;
    let query = {};
    
    if (search) {
      query.$or = [
        { pickupPoint: { $regex: search, $options: 'i' } },
        { destination: { $regex: search, $options: 'i' } }
      ];
    }
    if (tripType) query.tripType = tripType;
    if (status) query.status = status;
    
    let sortOption = {};
    if (sort === 'time') sortOption.rideTime = 1;
    else if (sort === 'fare') sortOption.totalFare = 1;
    else if (sort === 'seats') sortOption.availableSeats = -1;
    else sortOption.createdAt = -1;

    let rides = await Ride.find(query)
      .populate('creator', 'name email')
      .populate('joinedUsers', 'name email')
      .sort(sortOption)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    for (let ride of rides) {
      if (ride.status === 'open' && ride.joinedUsers.length >= ride.availableSeats) {
        ride.status = 'completed';
        await ride.save();
        ride.status = 'completed';
      }
    }
    
    const total = await Ride.countDocuments(query);
    res.json({ rides, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getRideById = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id)
      .populate('creator', 'name email')
      .populate('joinedUsers', 'name email');
    if (!ride) return res.status(404).json({ message: 'Ride not found' });
    res.json(ride);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (!ride) return res.status(404).json({ message: 'Ride not found' });
    if (ride.creator.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const { pickupPoint, destination, rideTime, availableSeats, totalFare, tripType, status } = req.body;
    if (pickupPoint) ride.pickupPoint = pickupPoint;
    if (destination) ride.destination = destination;
    if (rideTime) ride.rideTime = new Date(rideTime);
    if (availableSeats !== undefined) ride.availableSeats = availableSeats;
    if (totalFare) ride.totalFare = totalFare;
    if (tripType) ride.tripType = tripType;
    if (status) ride.status = status;
    await ride.save();
    res.json(ride);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (!ride) return res.status(404).json({ message: 'Ride not found' });
    if (ride.creator.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await Ride.findByIdAndDelete(req.params.id);
    res.json({ message: 'Ride deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserRides = async (req, res) => {
  try {
    const rides = await Ride.find({ creator: req.user._id })
      .populate('creator', 'name email')
      .populate('joinedUsers', 'name email')
      .sort({ createdAt: -1 });
    res.json(rides);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const joinRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (!ride) return res.status(404).json({ message: 'Ride not found' });
    if (ride.status !== 'open') return res.status(400).json({ message: 'Ride is not open' });
    if (ride.creator.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot join your own ride' });
    }
    if (ride.joinedUsers.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already joined this ride' });
    }
  if (ride.joinedUsers.length >= ride.availableSeats) {
      return res.status(400).json({ message: 'No seats available. Ride is full.' });
    }
    ride.joinedUsers.push(req.user._id);
    
  if (ride.joinedUsers.length >= ride.availableSeats) {
      ride.status = 'completed';
    }
    
    await ride.save();
    const populatedRide = await Ride.findById(ride._id)
      .populate('creator', 'name email')
      .populate('joinedUsers', 'name email');
    res.json({ message: 'Joined ride successfully', ride: populatedRide });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const leaveRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (!ride) return res.status(404).json({ message: 'Ride not found' });
    ride.joinedUsers = ride.joinedUsers.filter(id => id.toString() !== req.user._id.toString());
    
  if (ride.status === 'completed' && ride.joinedUsers.length < ride.availableSeats) {
      ride.status = 'open';
    }
    
    await ride.save();
    const populatedRide = await Ride.findById(ride._id)
      .populate('creator', 'name email')
      .populate('joinedUsers', 'name email');
    res.json({ message: 'Left ride successfully', ride: populatedRide });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const completeRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (!ride) return res.status(404).json({ message: 'Ride not found' });
    if (ride.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Only creator can complete ride' });
    }
    ride.status = 'completed';
    await ride.save();
    res.json({ message: 'Ride completed', ride });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getFareSplit = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id)
      .populate('creator', 'name email')
      .populate('joinedUsers', 'name email');
    if (!ride) return res.status(404).json({ message: 'Ride not found' });
    const totalPeople = ride.joinedUsers.length + 1;
    const farePerPerson = ride.totalFare / totalPeople;
    res.json({
      totalFare: ride.totalFare,
      totalPeople,
      farePerPerson: farePerPerson.toFixed(2),
      creator: { ...ride.creator.toObject(), fare: farePerPerson.toFixed(2) },
      joinedUsers: ride.joinedUsers.map(user => ({ ...user.toObject(), fare: farePerPerson.toFixed(2) }))
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createRide,
  getAllRides,
  getRideById,
  updateRide,
  deleteRide,
  getUserRides,
  joinRide,
  leaveRide,
  completeRide,
  getFareSplit
};

