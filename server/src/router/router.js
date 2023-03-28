import Router from "express";
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
import {
  createPostValidation,
  getAllUserPostsValidation,
  getAllPostsValidation,
  ignoreThisPostValidation,
  changePostTextValidation,
  likePostValidation,
  deletePostValidation,
} from "../validation/validation-posts.js";
import { validationUserId } from "../validation/statistic-validation.js";
import {
  registrationValidation,
  authorizationValidation,
} from "../validation/validation-registration.js";
import statisticController from "../controller/statistic-controller.js";

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
router.post("/refresh", authController.refresh);

router.post(
  "/all-posts",
  getAllPostsValidation,
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
  deletePostValidation,
  isValidToken,
  postsController.deletePost
);
router.put(
  "/ignore-this-post",
  ignoreThisPostValidation,
  isValidToken,
  postsController.ingnoreThisPost
);
router.put(
  "/like-post",
  likePostValidation,
  isValidToken,
  postsController.likePost
);
router.put(
  "/update-post-text",
  changePostTextValidation,
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

router.post(
  "/get-likes-statistic",
  isValidToken,
  validationUserId,
  statisticController.getCountAllpostsLiked
);

export default router;
