const express = require('express');
const router = express.Router();
const { signup, login, getProfile, updateProfile, deleteProfile } = require('../controllers/authController');
const { auth } = require('../middlewares/authMiddleware');

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.delete('/profile', auth, deleteProfile);

module.exports = router;
