const express = require('express');
const router = express.Router();
const {
  getCampuses,
  getCampus,
  createCampus,
  updateCampus,
  deleteCampus,
} = require('../controllers/campusController');
const validateCampus = require('../middleware/validation/validateCampus');
const protect = require('../middleware/authMiddleware');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });

router
  .route('/')
  .get(getCampuses)
  .post(protect, upload.array('images'), validateCampus, createCampus);
router
  .route('/:id')
  .get(getCampus)
  .put(protect, updateCampus)
  .delete(protect, deleteCampus);

module.exports = router;
