import Router from "express";
import { body } from "express-validator";
import authController from "../controller/auth-controller.js";
import commentsController from "../controller/comments-controller.js";
import postsController from "../controller/posts-controller.js";
import { isValidToken } from "../middlewares/is-valid-token-middleware.js";
import {
  ValidationCreateComment,
  ValidationGetComments,
  ValidationLikes,
  ValidationChangeCommentText,
  ValidationDeleteComments,
} from "../validation/validation-comment.js";
import { createPostValidation } from "../validation/validation-create-post.js";
import { getAllUserPostsValidation } from "../validation/validation-get-all-user-posts.js";
import {
  registrationValidation,
  authorizationValidation,
} from "../validation/validation-registration.js";

const router = new Router();

router.post(
  "/registration",
  registrationValidation,
  authController.registration
);
router.post(
  "/authorization",
  authorizationValidation,
  authController.authorizacion
);
router.get("/all-users", isValidToken, authController.getAllUsers);
router.delete("/logout", isValidToken, authController.logout);
router.post("/refresh", isValidToken, authController.refresh);

router.post(
  "/all-posts",
  body("countSkip", "Тут пусто").notEmpty(),
  body("userId", "Invalid userId").isMongoId(),
  isValidToken,
  postsController.getAllPosts
);
router.post(
  "/all-user-posts",
  getAllUserPostsValidation,
  isValidToken,
  postsController.getAllUserPosts
);
router.post(
  "/create-post",
  createPostValidation,
  isValidToken,
  postsController.createPost
);
router.delete(
  "/delete-post",
  getAllUserPostsValidation,
  isValidToken,
  postsController.deletePost
);
router.put(
  "/ignore-this-post",
  body("id", "Invalid post id").isMongoId(),
  body("idUser", "Invalid user id").isMongoId(),
  isValidToken,
  postsController.ingnoreThisPost
);
router.put(
  "/like-post",
  body("id", "Invalid post id").isMongoId(),
  body("idUser", "Invalid user id").isMongoId(),
  isValidToken,
  postsController.likePost
);
router.put(
  "/update-post-text",
  body("id", "Invalid post id").isMongoId(),
  body("newText", "Invalid text length. Min: 1 , max: 140").isLength({
    min: 1,
    max: 140,
  }),
  isValidToken,
  postsController.updateTextPost
);

router.post(
  "/create-comment",
  isValidToken,
  ValidationCreateComment,
  commentsController.createComment
);

router.post(
  "/get-comments",
  isValidToken,
  ValidationGetComments,
  commentsController.getCommentsToPost
);

router.post(
  "/like-comment",
  isValidToken,
  ValidationLikes,
  commentsController.likePost
);

router.put(
  "/change-comment",
  isValidToken,
  ValidationChangeCommentText,
  commentsController.changeTextComment
);

router.delete(
  "/delete-comment",
  isValidToken,
  ValidationDeleteComments,
  commentsController.deleteComment
);

export default router;
