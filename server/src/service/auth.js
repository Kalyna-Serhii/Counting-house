const bcrypt = require('bcrypt');
const User = require('../models/user');
const tokenService = require('./token');
const UserDto = require('../dtos/userDto');
const ApiError = require('../exceptions/api-error');

function phoneByTemplate(phone) {
  let newPhone = phone;
  if (phone.startsWith('0')) {
    newPhone = `+38${phone}`;
  } else if (phone.startsWith('380')) {
    newPhone = `+${phone}`;
  }
  return newPhone;
}

const AuthService = {
  async registration(body) {
    const {
      name, surname, gender, email, password, floor, room, role, avatar,
    } = body;
    const { phone } = body;
    const hashedPassword = await bcrypt.hash(password, 3);
    const templatedPhone = phoneByTemplate(phone);
    const newUser = await User.create({
      name,
      surname,
      gender,
      phone: templatedPhone,
      password: hashedPassword,
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
  },

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
  },

  async logout(refreshToken) {
    await tokenService.removeToken(refreshToken);
  },

  async refresh(refreshToken) {
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
  },
};

module.exports = [AuthService, phoneByTemplate];
