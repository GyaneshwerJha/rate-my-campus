const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const validateUser = require('../middleware/validation/validateUser');

const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
} = require('../controllers/userController');

router.post('/register', validateUser, registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/', protect, getUser);

module.exports = router;
