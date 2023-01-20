import { body } from "express-validator";

export const getAllUserPostsValidation = [
  body("id", "Нужен ID юзера").isLength({ min: "1" }),
];
