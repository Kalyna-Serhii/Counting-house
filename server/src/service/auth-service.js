import bcrypt from 'bcrypt';
import UserModel from '../models/user-model';
import tokenService from './token-service';
import UserDto from '../dtos/user-dto';
import ApiError from '../exceptions/api-error';
import phoneByTemplate from '../validations/phoneByTemplate';

const AuthService = {
  async registration(body) {
    const {
      name, surname, gender, phone, email, password, floor, room, role, avatar,
    } = body;
    const hashedPassword = await bcrypt.hash(password, 3);
    const templatedPhone = phoneByTemplate(phone);
    const newUser = await UserModel.create({
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
      user = await UserModel.findOne({ where: { email } });
    } else {
      const phone = phoneOrEmail;
      const templatedPhone = phoneByTemplate(phone);
      user = await UserModel.findOne({ where: { phone: templatedPhone } });
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
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    await tokenService.removeToken(refreshToken);
  },

  async refresh(refreshToken) {
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findOne({ where: { id: userData.id } });
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  },
};

export default AuthService;
