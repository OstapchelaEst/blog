import { body } from "express-validator";

export const createPostValidation = [
  body("text", "Field text required").isLength({
    min: 1,
    max: 140,
  }),
  body("author", "Field author required").notEmpty(),
  body("authorID", "Field authorID required").notEmpty(),
];

export const getAllUserPostsValidation = [
  body("userId", "Invalid userId").isMongoId(),
];
export const deletePostValidation = [
  body("postId", "Invalid postId").isMongoId(),
];

export const getAllPostsValidation = [
  body("countSkip", "Тут пусто").notEmpty(),
  body("userId", "Invalid userId").isMongoId(),
];

export const ignoreThisPostValidation = [
  body("id", "Invalid post id").isMongoId(),
  body("idUser", "Invalid user id").isMongoId(),
];

export const changePostTextValidation = [
  body("id", "Invalid post id").isMongoId(),
  body("newText", "Invalid text length. Min: 1 , max: 140").isLength({
    min: 1,
    max: 140,
  }),
];

export const likePostValidation = [
  body("id", "Invalid post id").isMongoId(),
  body("idUser", "Invalid user id").isMongoId(),
];
