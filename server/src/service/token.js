const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token');
const Token = require('../models/token');

class TokenService {
  // eslint-disable-next-line class-methods-use-this
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
    return { accessToken, refreshToken };
  }

  // eslint-disable-next-line class-methods-use-this
  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async findToken(refreshToken) {
    const tokenData = await tokenModel.findOne({ where: { refreshToken } });
    return tokenData;
  }

  // eslint-disable-next-line class-methods-use-this
  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({
      where: {
        userId,
      },
    });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await tokenModel.create({ userId, refreshToken });
    return token;
  }

  // eslint-disable-next-line class-methods-use-this
  async removeToken(refreshToken) {
    const tokenData = await Token.findOne({
      where: {
        refreshToken,
      },
    });
    await tokenData.destroy();
  }
}

module.exports = new TokenService();
