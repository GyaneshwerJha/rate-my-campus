const Joi = require('joi');

userValidation = Joi.object({
  name: Joi.string()
    .required()
    .messages({ 'string.empty': 'Please enter your name' }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Please enter your email',
  }),
  password: Joi.string().min(8).required().messages({
    'string.empty': 'Please enter a password',
    'string.min': 'Password must be at least 8 characters',
  }),
});

const validateUser = (req, res, next) => {
  const { error } = userValidation.validate(req.body);
  if (error) {
    res.status(400);
    const message = error.details[0].message;
    throw new Error(message);
  } else {
    next();
  }
};

module.exports = validateUser;
