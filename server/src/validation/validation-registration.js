import { body } from "express-validator";

export const registrationValidation = [
  body("email", "Email is not valid").isEmail(),
  body("login", "Logint mast has minimum 3 symbols").isLength({
    min: 3,
  }),
  body("password", "Password mast has minimum 6 symbols").isLength({
    min: 6,
  }),
];

export const authorizationValidation = [
  body("email", "Email is not valid").isEmail(),
  body("password", "Wrong password").notEmpty(),
];
