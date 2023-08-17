import ApiError from '../exceptions/api-error';
import phoneByTemplate from '../validations/phoneByTemplate';
import User from '../models/user';

const AdminService = {
  async createFakeUser(body) {
    const {
      name, surname, gender, phone, email, floor, room, role, avatar,
    } = body;
    const templatedPhone = phoneByTemplate(phone);
    const newFakeUser = await User.create({
      name,
      surname,
      gender,
      phone: templatedPhone,
      email,
      floor,
      room,
      role,
      avatar,
    });
    return newFakeUser;
  },

  async updateFakeUser(params, body) {
    const { id } = params;
    const user = await User.findOne({ where: { id } });
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
    const updatedFakeUser = await user.update(updatedFields);
    return updatedFakeUser;
  },
};

export default AdminService;
