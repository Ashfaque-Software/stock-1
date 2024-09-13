const express = require('express');
const { getProfile, updateProfile } = require('../controllers/userController');
const auth = require('../utils/authMiddleware');

const router = express.Router();

router.get('/profile/:userId', auth, getProfile);
router.put('/profile', auth, updateProfile);

module.exports = router;
