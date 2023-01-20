import { sendError } from "../exaptions/send-errors.js";
import jwt from "jsonwebtoken";
import { SECRET_TOKEN_KEY } from "../controller/auth-controller.js";

export const isVladToken = (req, res, next) => {
  try {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
    if (token) {
      const decode = jwt.verify(token, SECRET_TOKEN_KEY);
      next();
    } else {
      throw Error("Не валидный токен");
    }
  } catch (error) {
    sendError(res, error);
  }
};
