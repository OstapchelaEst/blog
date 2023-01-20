import authServices from "../services/auth-services.js";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import modelRegistration from "../models/model-registration.js";
import bcrypt from "bcrypt";
import { sendError } from "../exaptions/send-errors.js";

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

      if (!errors.isEmpty()) {
        const errorMessage = errors.errors.map((error) => error.msg).join(".");
        throw new Error(errorMessage);
      }

      const candidateLogin = await modelRegistration.findOne({ login });
      const candidateEmail = await modelRegistration.findOne({ email });
      if (candidateLogin) {
        throw new Error("Пользователь с таким логином уже существует");
      }
      if (candidateEmail) {
        throw new Error("Пользователь с такой почтой уже существует");
      }

      const hashPassword = await AuthController.getHashPassword(password);
      const user = await authServices.createUser({
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
      if (!errors.isEmpty()) {
        const errorMessage = errors.errors.map((error) => error.msg).join(".");
        throw new Error(errorMessage);
      }
      const { email, password } = req.body;
      const isUserExist = await authServices.findUser(email);
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
