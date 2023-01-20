import MongooseServices from "../services/mongoose-services.js";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import modelRegistration from "../models/model-registration.js";
import bcrypt from "bcrypt";
import { sendError } from "../exaptions/send-errors.js";
import { checkErrors } from "../validation/check-errors-array.js";

export const SECRET_TOKEN_KEY = "SECRETNII_SEKRET";
const LIVE_CICLE_TOKEN = "1d";

class AuthController {
  static async getHashPassword(password) {
    const salt = await bcrypt.genSalt(7);
    return await bcrypt.hash(String(password), salt);
  }

  async registration(req, res) {
    try {
      const { login, email, password } = req.body;
      const errors = validationResult(req);
      checkErrors(errors);
      const candidateLogin = await MongooseServices.findBy(
        "login",
        login,
        modelRegistration
      );
      const candidateEmail = await MongooseServices.findBy(
        "email",
        email,
        modelRegistration
      );
      if (candidateLogin || candidateEmail) {
        console.log(candidateLogin, candidateEmail);
        const allErrors = [];
        if (candidateLogin)
          allErrors.push("Пользователь с таким логином уже существует");
        if (candidateEmail)
          allErrors.push("Пользователь с таким email логином уже существует");
        throw new Error(allErrors.join(". "));
      }

      const hashPassword = await AuthController.getHashPassword(password);
      const user = await MongooseServices.create(modelRegistration, {
        login,
        email,
        password: hashPassword,
      });

      const userId = String(user._id);
      const token = jwt.sign({ login, email, userId }, SECRET_TOKEN_KEY, {
        expiresIn: LIVE_CICLE_TOKEN,
      });

      res.status(200).json({ token });
    } catch (error) {
      sendError(res, error);
    }
  }

  async authorizacion(req, res) {
    try {
      const errors = validationResult(req);
      checkErrors(errors);
      const { email, password } = req.body;
      const isUserExist = await MongooseServices.findBy(
        "email",
        email,
        modelRegistration
      );
      if (!isUserExist) {
        throw new Error("Пользователя с такой почтой не существует");
      }
      const isValidPassword = bcrypt.compare(password, isUserExist.password);
      if (!isValidPassword) {
        throw new Error("Не верный пароль");
      }
      const { login, _id } = isUserExist;
      console.log(login, _id);
      const token = jwt.sign(
        { login, email, userId: String(_id) },
        SECRET_TOKEN_KEY,
        {
          expiresIn: LIVE_CICLE_TOKEN,
        }
      );
      res.status(200).json({ token });
    } catch (error) {
      sendError(res, error);
    }
  }

  async getAllUsers(req, res) {
    try {
      const allUsers = await modelRegistration.find();
      res.status(200).json(allUsers);
    } catch (error) {
      sendError(res, error);
    }
  }
}

export default new AuthController();
