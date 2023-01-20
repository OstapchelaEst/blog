import { body } from "express-validator";

export const registrationValidation = [
  body("email", "Email не прошёл валидацию").isEmail(),
  body("login", "Логин должен содержать минимум 3 символа").isLength({
    min: 3,
  }),
  body("password", "Пароль должен содержать минимум 6 символов").isLength({
    min: 6,
  }),
];

export const authorizationValidation = [
  body("email", "Email не прошёл валидацию").isEmail(),
  body("password", "Пароль должен содержать минимум 6 символов").isLength({
    min: 6,
  }),
];
