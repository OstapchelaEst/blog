import jwt from "jsonwebtoken";
import mongooseServices from "./mongoose-services.js";
import TokenModel from "../models/model-token.js";

export const SECRET_ACCESS_TOKEN_KEY = "SECRETNII_SEKRET";
export const SECRET_REFRESH_TOKEN_KEY = "SECRETNII_SEKRET_REFRESH";
const LIVE_CICLE_ACCESS_TOKEN = "1d";
const LIVE_CICLE_REFRESH_TOKEN = "30d";

class TokenServices {
  generateTokens(payloda) {
    const accessToken = jwt.sign(payloda, SECRET_ACCESS_TOKEN_KEY, {
      expiresIn: LIVE_CICLE_ACCESS_TOKEN,
    });
    const refreshToken = jwt.sign(payloda, SECRET_REFRESH_TOKEN_KEY, {
      expiresIn: LIVE_CICLE_REFRESH_TOKEN,
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, SECRET_ACCESS_TOKEN_KEY);
      return userData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, SECRET_REFRESH_TOKEN_KEY);
      return userData;
    } catch (error) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await mongooseServices.findBy("user", userId, TokenModel);
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await mongooseServices.create(TokenModel, {
      user: userId,
      refreshToken,
    });
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await mongooseServices.findAndDelete(
      TokenModel,
      "refreshToken",
      refreshToken
    );
    return tokenData;
  }

  async removeToken(refreshToken) {
    const tokenData = await mongooseServices.findAndDelete(
      TokenModel,
      "refreshToken",
      refreshToken
    );
    return tokenData;
  }
}

export default new TokenServices();
