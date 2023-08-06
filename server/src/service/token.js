const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token');

class TokenService {
  // eslint-disable-next-line class-methods-use-this
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
    return { accessToken, refreshToken };
  }

  // eslint-disable-next-line class-methods-use-this
  async saveToken(userId, refreshToken) {
    const tokenAlreadyExists = await tokenModel.findOne({ user: userId });
    if (tokenAlreadyExists) {
      tokenAlreadyExists.refreshToken = refreshToken;
      return tokenAlreadyExists.save();
    }
    const token = await tokenModel.create({ user: userId, refreshToken });
    return token;
  }
}

module.exports = new TokenService();
