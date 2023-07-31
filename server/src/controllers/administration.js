const { Op } = require('sequelize');
const User = require('../models/user');
const [CreateFakeUserValidation, UpdateFakeUserValidation] = require('../validations/administration');

class FakeUserController {
  // eslint-disable-next-line class-methods-use-this
  async createFakeUser(req, res) {
    const { error: customError } = CreateFakeUserValidation(req.body);
    if (customError) {
      const errorMessage = customError.details[0].message;
      return res.status(400).json({ error: errorMessage });
    }
    try {
      const {
        name, surname, email, floor, room, avatar,
      } = req.body;
      let { phone, gender, role } = req.body;
      if (phone.startsWith('0')) {
        phone = `+38${phone}`;
      } else if (phone.startsWith('380')) {
        phone = `+${phone}`;
      }

      const phoneAlreadyExists = await User.findOne({
        where: {
          phone,
        },
      });
      if (phoneAlreadyExists) {
        return res.status(409).json('Користувач з таким номером телефону вже існує');
      }
      if (email) {
        const emailAlreadyExists = await User.findOne({
          where: {
            email,
          },
        });
        if (emailAlreadyExists) {
          return res.status(409).json('Користувач з таким email вже існує');
        }
      }
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

    // #swagger.tags = ['Administration']
    // #swagger.summary = 'Create a new fake user'
    // #swagger.description = 'Creates a new fake user with the provided information'
    /*  #swagger.parameters['obj'] = {
               in: 'body',
               description: 'User object',
               schema: {
                    $name: 'John',
                    surname: 'Doe',
                    gender: 'man',
                    $phone: '0123456789',
                    email: 'john.doe@example.com',
                    $floor: 5,
                    $room: 34,
                    role: 'admin',
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
    const { error: customError } = UpdateFakeUserValidation(req.body);
    if (customError) {
      const errorMessage = customError.details[0].message;
      return res.status(400).json({ customError: errorMessage });
    }
    const { id } = req.params;
    if (id < 1) {
      return res.status(400).json('Id не може бути менше за 1');
    }
    const user = await User.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      return res.status(400).json('Такого користувача не існує');
    }
    try {
      const {
        name, surname, gender, email, floor, room, role, avatar,
      } = req.body;
      let { phone } = req.body;
      if (phone.startsWith('0')) {
        phone = `+38${phone}`;
      } else if (phone.startsWith('380')) {
        phone = `+${phone}`;
      }
      const phoneAlreadyExists = await User.findOne({
        where: {
          phone,
          id: {
            [Op.ne]: id,
          },
        },
      });
      if (phoneAlreadyExists) {
        return res.status(409).json('Користувач з таким номером телефону вже існує');
      }
      if (email) {
        const emailAlreadyExists = await User.findOne({
          where: {
            email,
            id: {
              [Op.ne]: id,
            },
          },
        });
        if (emailAlreadyExists) {
          return res.status(409).json('Користувач з таким email вже існує');
        }
      }
      const updatedFields = {};
      if (name) {
        updatedFields.name = name;
      }
      updatedFields.surname = surname;
      if (gender) {
        updatedFields.gender = gender;
      }
      if (phone) {
        updatedFields.phone = phone;
      }
      updatedFields.email = email;
      if (floor) {
        updatedFields.floor = floor;
      }
      if (room) {
        updatedFields.room = room;
      }
      if (role) {
        updatedFields.role = role;
      }
      if (avatar) {
        updatedFields.avatar = avatar;
      }
      const updatedUser = await user.update(updatedFields);
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json(error.message);
    }

    // #swagger.tags = ['Administration']
    // #swagger.summary = 'Update a fake user'
    // #swagger.description = 'Updates a fake user by user id with the provided information'
    /*  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'User object',
                schema: {
                    $name: 'John',
                    surname: 'Doe',
                    gender: 'man',
                    $phone: '0123456789',
                    email: 'john.doe@example.com',
                    $floor: 5,
                    $room: 34,
                    role: 'admin',
                    avatar: ''
                }
        } */
    /* #swagger.responses[200] = {
            description: 'Successful response',
            schema: {
                id: 5,
                name: 'Jane',
                surname: 'Smith',
                gender: 'man',
                phone: '0987654321',
                email: 'jane.smith@example.com',
                floor: 2,
                room: 10,
                role: 'user',
                avatar: ''
            }
          } */
  }
}

module.exports = new FakeUserController();
