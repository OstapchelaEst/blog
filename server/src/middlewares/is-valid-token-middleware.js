import { APIerror } from "../exceptions/send-errors.js";
import jwt from "jsonwebtoken";
import { SECRET_ACCESS_TOKEN_KEY } from "../services/token-services.js";

export const isValidToken = (req, res, next) => {
  try {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
    if (token) {
      const decode = jwt.verify(token, SECRET_ACCESS_TOKEN_KEY);
      next();
    } else {
      throw APIerror.UnauthorizedError("Не валидный токен");
    }
  } catch (error) {
    next(error);
  }
};
