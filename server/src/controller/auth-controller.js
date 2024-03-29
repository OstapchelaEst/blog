import MongooseServices from "../services/mongoose-services.js";
import { validationResult } from "express-validator";
import modelRegistration from "../models/model-registration.js";
import bcrypt from "bcrypt";
import { checkErrors } from "../validation/check-errors-array.js";
import tokenServices from "../services/token-services.js";
import { APIerror } from "../exceptions/send-errors.js";
import modelToken from "../models/model-token.js";

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
        const errorsArr = [];
        if (candidateLogin) {
          allErrors.push("User with this login alredy exists");
          errorsArr.push({
            login: "User with this login alredy exists",
          });
        }
        if (candidateEmail) {
          allErrors.push("User with this email alredy exists");
          errorsArr.push({
            email: "User with this email alredy exists",
          });
        }
        throw APIerror.BadRequest(allErrors.join(". "), errorsArr);
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
        throw APIerror.BadRequest("User with this email alredy exists", [
          { email: "User with this email alredy exists" },
        ]);
      }

      const isValidPassword = await bcrypt.compare(
        password,
        isUserExist.password
      );

      if (!isValidPassword) {
        throw APIerror.BadRequest("Wrong password", [
          { password: "Wrong password" },
        ]);
      }

      const { login, _id } = isUserExist;
      const { accessToken, refreshToken } = tokenServices.generateTokens({
        login,
        email,
        userId: String(_id),
      });

      await tokenServices.saveToken(_id, refreshToken);

      res.header("Access-Control-Allow-Credentials", true);
      await res.cookie("refreshToken", refreshToken, {
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
      console.log(token);
      res.clearCookie("refreshToken");
      res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = tokenServices.validateRefreshToken(refreshToken);
      const tokenFromDb = await modelToken.find({ refreshToken });
      if (!userData || !tokenFromDb) {
        throw APIerror.UnauthorizedError();
      }
      const { login, email, userId } = userData;
      const tokens = tokenServices.generateTokens({
        login,
        email,
        userId,
      });

      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      await tokenServices.saveToken(userData.userId, refreshToken);

      res
        .status(200)
        .json({ login, email, userId, accessToken: tokens.accessToken });
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
