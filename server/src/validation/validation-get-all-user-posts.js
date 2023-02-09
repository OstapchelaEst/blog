import { body } from "express-validator";

export const getAllUserPostsValidation = [body("id", "Invalid ID").isMongoId()];
