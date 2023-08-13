const bcrypt = require('bcrypt');
const User = require('../models/user');
const tokenService = require('./token');
const UserDto = require('../dtos/userDto');
const ApiError = require('../exceptions/api-error');

class AuthService {
  // eslint-disable-next-line class-methods-use-this
  async registration(body) {
    const {
      name, surname, email, floor, room, avatar,
    } = body;
    let {
      password, phone, gender, role,
    } = body;
    password = await bcrypt.hash(password, 3);
    if (phone.startsWith('0')) {
      phone = `+38${phone}`;
    } else if (phone.startsWith('380')) {
      phone = `+${phone}`;
    }
    if (!gender) {
      gender = 'man';
    }
    if (!role) {
      role = 'user';
    }
    const newUser = await User.create({
      name,
      surname,
      gender,
      phone,
      password,
      email,
      floor,
      room,
      role,
      avatar,
    });
    const userDto = new UserDto(newUser);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  // eslint-disable-next-line class-methods-use-this
  async login(body) {
    const { phoneOrEmail, password } = body;
    let user;
    if (phoneOrEmail.includes('@')) {
      const email = phoneOrEmail;
      user = await User.findOne({ where: { email } });
    } else {
      let phone = phoneOrEmail;
      if (phone.startsWith('0')) {
        phone = `+38${phone}`;
      } else if (phone.startsWith('380')) {
        phone = `+${phone}`;
      }
      user = await User.findOne({ where: { phone } });
    }
    if (!user) {
      throw ApiError.BadRequest('Такого користувача не існує');
    }
    const isPasswordEquals = await bcrypt.compare(password, user.password);
    if (!isPasswordEquals) {
      throw ApiError.BadRequest('Невірний пароль');
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  // eslint-disable-next-line class-methods-use-this
  async logout(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    await tokenService.removeToken(refreshToken);
  }

  // eslint-disable-next-line class-methods-use-this
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await User.findOne({ where: { id: userData.id } });
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
}

module.exports = new AuthService();
