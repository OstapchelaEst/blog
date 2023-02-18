import Router from "express";
import { body } from "express-validator";
import authController from "../controller/auth-controller.js";
import commentsController from "../controller/comments-controller.js";
import postsController from "../controller/posts-controller.js";
import { isVladToken } from "../middlewares/is-valid-token-middleware.js";
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
router.get("/all-users", isVladToken, authController.getAllUsers);
router.delete("/logout", isVladToken, authController.logout);
router.post("/refresh", isVladToken, authController.refresh);

router.post(
  "/all-posts",
  body("countSkip", "Тут пусто").notEmpty(),
  isVladToken,
  postsController.getAllPosts
);
router.post(
  "/all-user-posts",
  getAllUserPostsValidation,
  isVladToken,
  postsController.getAllUserPosts
);
router.post(
  "/create-post",
  createPostValidation,
  isVladToken,
  postsController.createPost
);
router.delete(
  "/delete-post",
  getAllUserPostsValidation,
  isVladToken,
  postsController.deletePost
);
router.put(
  "/ignore-this-post",
  body("id", "Invalid post id").isMongoId(),
  body("idUser", "Invalid user id").isMongoId(),
  isVladToken,
  postsController.ingnoreThisPost
);
router.put(
  "/like-post",
  body("id", "Invalid post id").isMongoId(),
  body("idUser", "Invalid user id").isMongoId(),
  isVladToken,
  postsController.likePost
);
router.put(
  "/update-post-text",
  body("id", "Invalid post id").isMongoId(),
  body("newText", "Invalid text length. Min: 1 , max: 140").isLength({
    min: 1,
    max: 140,
  }),
  isVladToken,
  postsController.updateTextPost
);

router.post(
  "/create-comment",
  isVladToken,
  ValidationCreateComment,
  commentsController.createComment
);

router.post(
  "/get-comments",
  isVladToken,
  ValidationGetComments,
  commentsController.getCommentsToPost
);

router.post(
  "/like-comment",
  isVladToken,
  ValidationLikes,
  commentsController.likePost
);

router.put(
  "/change-comment",
  isVladToken,
  ValidationChangeCommentText,
  commentsController.changeTextComment
);

router.delete(
  "/delete-comment",
  isVladToken,
  ValidationDeleteComments,
  commentsController.deleteComment
);

export default router;
