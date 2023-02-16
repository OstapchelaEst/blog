import { body } from "express-validator";

export const ValidationCreateComment = [
  body(
    "authorLogin",
    "Invalid length (min 3 symbols) in field authorLogin"
  ).isLength({
    min: 3,
  }),
  body("authorId", "Invalid mongoId in field authorId").isMongoId(),
  body("postId", "Invalid mongoId in field postId").isMongoId(),
  body("text", "Invalid length (1-140 symbols) text in field text").isLength({
    min: 1,
    max: 140,
  }),
];

export const ValidationGetComments = [
  body("postId", "Invalid mongoId in field postId").isMongoId(),
];

export const ValidationLikes = [
  body("commentId", "Invalid mongoId in field commentId").isMongoId(),
  body("userId", "Invalid mongoId in field userId").isMongoId(),
];

export const ValidationChangeCommentText = [
  body("commentId", "Invalid mongoId in field commentId").isMongoId(),
  body(
    "newText",
    "Invalid length (1-140 symbols) text in field newText"
  ).isLength({
    min: 1,
    max: 140,
  }),
];

export const ValidationDeleteComments = [
  body("commentId", "Invalid mongoId in field commentId").isMongoId(),
];
