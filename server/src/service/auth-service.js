import bcrypt from 'bcrypt';
import UserModel from '../models/user-model';
import tokenService from './token-service';
import UserDto from '../dtos/user-dto';
import ApiError from '../exceptions/api-error';
import phoneByTemplate from '../validations/phoneByTemplate';
import {isEmail, isValidUkrainianPhone} from '../validations/validation';
import {toStandardFormat, removeNonDigits} from '../utils/phone';

const AuthService = {
  async registration(body) {
    const {name, surname, gender, phone, email, password, floor, room, role, avatar} = body;
    const hashedPassword = await bcrypt.hash(password, 3);
    const newUser = await UserModel.create({
      name,
      surname,
      gender,
      phone,
      password: hashedPassword,
      email,
      floor,
      room,
      role,
      avatar,
    });
    const userDto = new UserDto(newUser);
    const tokens = tokenService.generateTokens({...userDto});
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {...tokens, user: userDto};
  },

  async login(body) {
    const {phoneOrEmail, password} = body;
    if (!phoneOrEmail.length && !password.length) {
      throw new ApiError({message: 'Введите логин и пароль'});
    }
    console.log(1);
    let user;
    if (isEmail(phoneOrEmail)) {
      user = await UserModel.findOne({where: {email: phoneOrEmail}});
    }
    const phone = toStandardFormat(removeNonDigits(phoneOrEmail));

    console.log('toStandardFormat', phone);
    if (!isValidUkrainianPhone(phone)) {
      user = await UserModel.findOne({where: {phone}});
    }
    if (!user) {
      throw new ApiError({message: 'Такого користувача не існує'});
    }
    const isPasswordEquals = await bcrypt.compare(password, user.password);
    if (!isPasswordEquals) {
      throw new ApiError({message: 'Невірний пароль'});
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({...userDto});
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {...tokens, user: userDto};
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
    const user = await UserModel.findOne({where: {id: userData.id}});
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({...userDto});
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {...tokens, user: userDto};
  },
};

export default AuthService;
