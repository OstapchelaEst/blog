export class APIerror extends Error {
  status;
  errors;
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new APIerror(401, "User are not authorized");
  }

  static BadRequest(message, errors) {
    return new APIerror(400, message, errors);
  }
}
