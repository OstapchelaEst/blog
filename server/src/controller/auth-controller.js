import MongooseServices from "../services/mongoose-services.js";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import modelRegistration from "../models/model-registration.js";
import bcrypt from "bcrypt";
import { checkErrors } from "../validation/check-errors-array.js";
import tokenServices from "../services/token-services.js";
import { APIerror } from "../exceptions/send-errors.js";

class AuthController {
  static async getHashPassword(password) {
    const salt = await bcrypt.genSalt(7);
    return await bcrypt.hash(String(password), salt);
  }

  async registration(req, res, next) {
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
        const allErrors = [];
        if (candidateLogin)
          allErrors.push("Пользователь с таким логином уже существует");
        if (candidateEmail)
          allErrors.push("Пользователь с таким email логином уже существует");
        throw APIerror.BadRequest(allErrors.join(". "), []);
      }

      const hashPassword = await AuthController.getHashPassword(password);
      const user = await MongooseServices.create(modelRegistration, {
        login,
        email,
        password: hashPassword,
      });

      const userId = String(user._id);
      const { accessToken, refreshToken } = tokenServices.generateTokens({
        login,
        email,
        userId,
      });

      await tokenServices.saveToken(userId, refreshToken);

      res.cookie("refreshToken", refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.status(200).json({ login, email, userId, accessToken });
    } catch (error) {
      next(error);
    }
  }

  async authorizacion(req, res, next) {
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
        throw APIerror.BadRequest("Пользователя с такой почтой не существует");
      }

      const isValidPassword = bcrypt.compare(password, isUserExist.password);
      if (!isValidPassword) {
        throw APIerror.BadRequest("Не верный пароль", []);
      }

      const { login, _id } = isUserExist;
      const { accessToken, refreshToken } = tokenServices.generateTokens({
        login,
        email,
        userId: String(_id),
      });
      await tokenServices.saveToken(_id, refreshToken);
      res.cookie("refreshToken", refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.status(200).json({ login, email, userId: _id, accessToken });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await tokenServices.removeToken(refreshToken);
      res.clearCookie("refreshToken");
      res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const oldToken = req.headers.authorization.split(" ")[1];
      console.log(oldToken);
      const { login, email, userId } = jwt.decode(oldToken);

      const { accessToken, refreshToken } = tokenServices.generateTokens({
        login,
        email,
        userId,
      });
      res.cookie("refreshToken", refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.status(200).json({ login, email, userId, accessToken });
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const allUsers = await modelRegistration.find();
      res.status(200).json(allUsers);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
