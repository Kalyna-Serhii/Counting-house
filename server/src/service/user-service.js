import ApiError from '../exceptions/api-error';
import UserModel from '../models/user-model';
import phoneByTemplate from '../validations/phoneByTemplate';

const UserService = {
  async getUsers() {
    const users = await UserModel.findAll();
    return users;
  },

  async getUserById(params) {
    const { id } = params;
    const user = await UserModel.findOne({ where: { id } });
    if (!user) {
      throw ApiError.BadRequest('Такого користувача не існує');
    }
    return user;
  },

  async updateUser(params, body) {
    const { id } = params;
    const user = await UserModel.findOne({ where: { id } });
    if (!user) {
      throw ApiError.BadRequest('Такого користувача не існує');
    }
    const {
      name, surname, gender, phone, email, floor, room, role, avatar,
    } = body;
    const templatedPhone = phoneByTemplate(phone);
    const updatedFields = {};
    updatedFields.name = name;
    updatedFields.surname = surname;
    updatedFields.gender = gender;
    updatedFields.phone = templatedPhone;
    updatedFields.email = email;
    updatedFields.floor = floor;
    updatedFields.room = room;
    updatedFields.role = role;
    updatedFields.avatar = avatar;
    const updatedUser = await user.update(updatedFields);
    return updatedUser;
  },

  async deleteUser(params) {
    const { id } = params;
    const user = await UserModel.findOne({ where: { id } });
    if (!user) {
      throw ApiError.BadRequest('Такого користувача не існує');
    }
    await user.destroy();
  },
};

export default UserService;
