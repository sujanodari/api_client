import Joi = require('@hapi/joi');

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  gender: Joi.string().required(),
  age: Joi.number().required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  email: Joi.string().email().required(),
  address: Joi.string().required(),
  dob: Joi.string().required(),
  nationality: Joi.string().required(),
  educationBackground: Joi.array().items(
    Joi.object({
      organization: Joi.string().required(),
      level: Joi.string().required(),
      startYear: Joi.number().required(),
      endYear: Joi.number().required(),
    }),
  ),
});
