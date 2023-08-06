const bcrypt = require('bcrypt');
const UserValidation = require('../validations/user');
const User = require('../models/user');
const UserDto = require('../dtos/userDto');
const tokenService = require('./token');

class AuthService {
  // eslint-disable-next-line class-methods-use-this
  async registration(req, res) {
    const { error: customError } = UserValidation(req.body);
    if (customError) {
      const errorMessage = customError.details[0].message;
      return res.status(400).json({ error: errorMessage });
    }
    try {
      const {
        name, surname, email, floor, room, avatar,
      } = req.body;
      let {
        password, phone, gender, role,
      } = req.body;
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
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = new AuthService();
