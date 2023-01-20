import Router from "express";
import authController from "../controller/auth-controller.js";
import { isVladToken } from "../middlewares/isValidToken.js";
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

export default router;
