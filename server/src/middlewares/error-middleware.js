import { ApiErrors } from "../exaptions/api-errors.js";

export function errorMiddleware(err, req, res, next) {
  console.log(err);
  if (err instanceof ApiErrors) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: "На, пожуй " });
}
