const User = require('../models/user');
const FakeUserValidation = require('../validations/admin');

function phoneByTemplate(phone) {
  let newPhone = phone;
  if (phone.startsWith('0')) {
    newPhone = `+38${phone}`;
  } else if (phone.startsWith('380')) {
    newPhone = `+${phone}`;
  }
  return newPhone;
}

class FakeUserController {
  // eslint-disable-next-line class-methods-use-this
  async createFakeUser(req, res) {
    const { error: customError } = FakeUserValidation(req.body);
    if (customError) {
      const errorMessages = customError.details.map((detail) => detail.message);
      const errorMessage = errorMessages.join(', ');
      return res.status(400).json({ error: errorMessage });
    }
    try {
      const {
        name, surname, email, floor, room, avatar,
      } = req.body;
      let { phone, gender, role } = req.body;
      phone = phoneByTemplate(phone);
      if (!gender) {
        gender = 'man';
      }
      if (!role) {
        role = 'user';
      }
      const newFakeUser = await User.create({
        name,
        surname,
        gender,
        phone,
        email,
        floor,
        room,
        role,
        avatar,
      });
      return res.status(201).json(newFakeUser);
    } catch (error) {
      return res.status(500).json(error.message);
    }

    // #swagger.tags = ['Admin']
    // #swagger.summary = 'Create a new fake user'
    // #swagger.description = 'Creates a new fake user with the provided information'
    /*  #swagger.parameters['obj'] = {
               in: 'body',
               description: 'User object',
               schema: {
                    $name: 'John',
                    surname: 'Doe',
                    $gender: 'man',
                    $phone: '0123456789',
                    email: 'john.doe@example.com',
                    $floor: 5,
                    $room: 34,
                    $role: 'admin',
                    avatar: ''
                }
        } */
    /* #swagger.responses[201] = {
            description: 'Successful response',
            schema: {
                id: 5,
                name: 'John',
                surname: 'Doe',
                gender: 'man',
                phone: '0123456789',
                password: null,
                email: 'john.doe@example.com',
                floor: 5,
                room: 34,
                role: 'admin',
                avatar: ''
            }
        } */
  }

  // eslint-disable-next-line class-methods-use-this
  async updateFakeUser(req, res) {
    const { error: customError } = FakeUserValidation(req.body);
    if (customError) {
      const errorMessage = customError.details[0].message;
      return res.status(400).json({ customError: errorMessage });
    }
    const { id } = req.params;
    if (id < 1) {
      return res.status(400).json('Id не може бути менше за 1');
    }
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(400).json('Такого користувача не існує');
    }
    try {
      const {
        name, surname, gender, email, floor, room, role, avatar,
      } = req.body;
      let { phone } = req.body;
      phone = phoneByTemplate(phone);
      const updatedFields = {};
      updatedFields.name = name;
      updatedFields.surname = surname;
      updatedFields.gender = gender;
      updatedFields.phone = phone;
      updatedFields.email = email;
      updatedFields.floor = floor;
      updatedFields.room = room;
      updatedFields.role = role;
      updatedFields.avatar = avatar;
      const updatedUser = await user.update(updatedFields);
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json(error.message);
    }

    // #swagger.tags = ['Admin']
    // #swagger.summary = 'Update a fake user'
    // #swagger.description = 'Updates a fake user by user id with the provided information'
    /*  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'User object',
                schema: {
                    $name: 'John',
                    surname: 'Doe',
                    $gender: 'man',
                    $phone: '0123456789',
                    email: 'john.doe@example.com',
                    $floor: 5,
                    $room: 34,
                    $role: 'admin',
                    avatar: ''
                }
        } */
    /* #swagger.responses[200] = {
            description: 'Successful response',
            schema: {
                id: 5,
                name: 'John',
                surname: 'Doe',
                gender: 'man',
                phone: '0123456789',
                password: null,
                email: 'john.doe@example.com',
                floor: 5,
                room: 34,
                role: 'admin',
                avatar: ''
            }
          } */
  }
}

module.exports = new FakeUserController();
