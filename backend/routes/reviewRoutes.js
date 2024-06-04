const express = require('express');
const router = express.Router({ mergeParams: true });
const { getReviews, createReview } = require('../controllers/reviewController');
const validateReview = require('../middleware/validation/validateReview');
const protect = require('../middleware/authMiddleware');

router.route('/').get(getReviews).post(protect, validateReview, createReview);

module.exports = router;
