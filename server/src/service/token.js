const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token');
const Token = require('../models/token');

const TokenService = {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
    return { accessToken, refreshToken };
  },

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  },

  async findToken(refreshToken) {
    const tokenData = await tokenModel.findOne({ where: { refreshToken } });
    return tokenData;
  },

  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({
      where: { userId },
    });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await tokenModel.create({ userId, refreshToken });
    return token;
  },

  async removeToken(refreshToken) {
    const tokenData = await Token.findOne({
      where: { refreshToken },
    });
    await tokenData.destroy();
  },
};

module.exports = TokenService;
