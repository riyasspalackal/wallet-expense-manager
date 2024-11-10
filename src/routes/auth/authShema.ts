import Joi from "joi";

// Added schema validation for signup
export const signupSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
});

// Added schema validation for login
export const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
