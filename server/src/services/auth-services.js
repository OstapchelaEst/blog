import modelRegistration from "../models/model-registration.js";
import Registration from "../models/model-registration.js";

class AuthServices {
  async createUser(user) {
    return await Registration.create(user);
  }
  async findUser(email) {
    return await modelRegistration.findOne({ email });
  }
}
export default new AuthServices();
