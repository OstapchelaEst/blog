import Router from "express";
import authController from "../controller/auth-controller.js";
import postsController from "../controller/posts-controller.js";
import { isVladToken } from "../middlewares/is-valid-token.js";
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

router.get("/all-posts", postsController.getAllPosts);
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

export default router;
