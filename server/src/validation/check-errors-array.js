import { APIerror } from "../exceptions/send-errors.js";

export const checkErrors = (errors) => {
  if (!errors.isEmpty()) {
    const errorMessage = errors.errors.map((error) => error.msg).join(". ");
    throw APIerror.BadRequest(errorMessage, errors.errors);
  }
};
