import { APIerror } from "../exceptions/send-errors.js";

export const errorMiddleware = (err, req, res, nex) => {
  if (err instanceof APIerror) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }

  return res.status(500).json({ message: "server error" });
};
