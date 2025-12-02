const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/rideController');
const { auth } = require('../middlewares/authMiddleware');

router.post('/', auth, createRide);
router.get('/', getAllRides);
router.get('/user', auth, getUserRides);
router.get('/:id', auth, getRideById);
router.put('/:id', auth, updateRide);
router.delete('/:id', auth, deleteRide);
router.post('/:id/join', auth, joinRide);
router.put('/:id/leave', auth, leaveRide);
router.put('/:id/complete', auth, completeRide);
router.get('/:id/fare-split', auth, getFareSplit);

module.exports = router;

