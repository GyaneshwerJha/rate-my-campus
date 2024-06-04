const Joi = require('joi');

campusValidation = Joi.object({
  name: Joi.string().required().max(50).messages({
    'string.empty': 'Please enter the campus name',
    'string.max': 'Campus name cannot be longer than 50 characters',
  }),
  location: Joi.string().required().max(50).messages({
    'string.empty': 'Please enter the campus location',
    'string.max': 'Campus location cannot be longer than 50 characters',
  }),
  description: Joi.string().required().max(450).messages({
    'string.empty': 'Please enter the campus description',
    'string.max': 'Campus description cannot be longer than 450 characters',
  }),
});

const validateCampus = (req, res, next) => {
  const { error } = campusValidation.validate(req.body);
  if (error) {
    res.status(400);
    const message = error.details[0].message;
    throw new Error(message);
  } else {
    next();
  }
};

module.exports = validateCampus;
