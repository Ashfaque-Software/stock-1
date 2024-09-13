const express = require('express');
const { register, login } = require('../controllers/authController'); // Ensure these imports are correct
const { check } = require('express-validator');

const router = express.Router();

router.post(
  '/register',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  register // Ensure register is correctly imported
);

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  login // Ensure login is correctly imported
);

module.exports = router;
