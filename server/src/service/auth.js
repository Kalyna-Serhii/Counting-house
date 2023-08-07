const bcrypt = require('bcrypt');
const [UserValidation, UserLoginValidation] = require('../validations/user');
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

  // eslint-disable-next-line class-methods-use-this
  async login(req, res) {
    const { error: customError } = UserLoginValidation(req.body);
    if (customError) {
      const errorMessage = customError.details[0].message;
      return res.status(400).json({ error: errorMessage });
    }
    try {
      const { phoneOrEmail, password } = req.body;
      let user;
      if (phoneOrEmail.includes('@')) {
        console.log('email');
        const email = phoneOrEmail;
        user = await User.findOne({
          where: {
            email,
          },
        });
      } else {
        let phone = phoneOrEmail;
        if (phone.startsWith('0')) {
          phone = `+38${phone}`;
        } else if (phone.startsWith('380')) {
          phone = `+${phone}`;
        }
        user = await User.findOne({
          where: {
            phone,
          },
        });
      }
      if (!user) {
        return res.status(400).json('Такого користувача не існує');
      }
      const isPasswordEquals = await bcrypt.compare(password, user.password);
      if (!isPasswordEquals) {
        return res.status(400).json('Невірний пароль');
      }
      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({ ...userDto });
      await tokenService.saveToken(userDto.id, tokens.refreshToken);
      return { ...tokens, user: userDto };
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = new AuthService();
