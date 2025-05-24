// validation/schemas.js
const Joi = require('joi');

// Exhibition validation schema
const exhibitionSchema = Joi.object({
  title: Joi.string().required().min(3).max(100),
  shortDescription: Joi.string().required().min(10).max(500),
  fullDescription: Joi.string().min(10),
  dateRange: Joi.string().required(),
  startDate: Joi.date().iso(),
  endDate: Joi.date().iso().min(Joi.ref('startDate')),
  image: Joi.string().uri().allow('', null),
  isCurrent: Joi.boolean().default(false),
  isUpcoming: Joi.boolean().default(false),
  type: Joi.string().valid('contemporary', 'classical', 'digital', 'photography', 'sculpture', 'other')
});

// Artwork validation schema
const artworkSchema = Joi.object({
  title: Joi.string().required().min(3).max(100),
  artist: Joi.string().required().min(2).max(100),
  year: Joi.string().pattern(/^\d{4}$/),
  medium: Joi.string().required(),
  description: Joi.string().min(10),
  image: Joi.string().uri().allow('', null),
  exhibitionId: Joi.string().uuid()
});

// User registration validation schema
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required().min(2).max(100),
  role: Joi.string().valid('visitor', 'staff', 'admin').default('visitor')
});

// Login validation schema
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

module.exports = {
  exhibitionSchema,
  artworkSchema,
  registerSchema,
  loginSchema
};