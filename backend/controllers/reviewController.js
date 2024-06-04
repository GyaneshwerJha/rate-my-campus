const asyncHandler = require('express-async-handler');
const Review = require('../models/reviewModel');
const Campus = require('../models/campusModel');

const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ campus: req.params.id }).populate(
    'author'
  );
  res.json(reviews);
});

const createReview = asyncHandler(async (req, res) => {
  // Check if campus exists
  const campus = await Campus.findById(req.params.id);
  if (!campus) {
    res.status(400);
    throw new Error('Campus not found');
  }

  // Check if user has already reviewed campus
  const reviewExists = await Review.exists({
    campus: req.params.id,
    author: req.user._id,
  });

  if (reviewExists) {
    res.status(400);
    throw new Error('Campus already reviewed');
  }

  const review = await new Review({ ...req.body });
  review.author = req.user._id;
  review.campus = campus.id;

  campus.reviews.push(review);
  await campus.save();
  await review.save();
  await review.populate('author');
  res.status(200).json(review);
});

module.exports = {
  getReviews,
  createReview,
};
