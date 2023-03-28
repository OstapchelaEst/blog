import { body } from "express-validator";

export const validationUserId = [body("userId", "invalid userId").isMongoId()];
