import { body } from "express-validator";

export const createPostValidation = [
  body("text", "Поле text обязательное").isLength({
    min: 1,
    max: 140,
  }),
  body("author", "Поле author обязательное").notEmpty(),
  body("authorID", "Поле authorID обязательное").notEmpty(),
];
