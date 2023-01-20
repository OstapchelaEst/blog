import { body } from "express-validator";

export const createPostValidation = [
  body("text", "Поле text обязательное").isLength({ min: 1, max: 200 }),
  body("author", "Поле author обязательное").isLength({ min: 1, max: 200 }),
  body("authorID", "Поле authorID обязательное").isLength({ min: 1, max: 200 }),
  body("datePublish", "Поле datePublish обязательное").isLength({
    min: 1,
    max: 200,
  }),
];
