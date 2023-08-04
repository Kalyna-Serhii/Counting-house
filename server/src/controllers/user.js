const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const User = require('../models/user');
const UpdateUserValidation = require('../validations/user');

class UserController {
  // eslint-disable-next-line class-methods-use-this
  async getUsers(req, res) {
    try {
      const users = await User.findAll();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json('Не вдалось виконати запит, спробуйте пізніше');
    }

    // #swagger.tags = ['Users']
    // #swagger.summary = 'Get a list of users'
    // #swagger.description = 'Returns a list of all users'
    /* #swagger.responses[200] = {
        description: 'Successful response',
        schema: {
            type: 'array'
        },
        examples: {
            'application/json': [
                {
                    id: 5,
                    name: 'John',
                    surname: 'Doe',
                    gender: 'man',
                    phone: '+380123456789',
                    password: 'f2bw02$g4415yNFT4BGk8aoxufQpuNYX5byukyoJjdzJvGuMnSTf4r2p6lga',
                    email: 'john.doe@example.com',
                    floor: 5,
                    room: 34,
                    role: 'admin',
                    avatar: '',
                },
                {
                    id: 6,
                    name: 'Jane',
                    surname: 'Smith',
                    gender: 'woman',
                    phone: '0987654321',
                    password: '$2b$04$g4415yNFT4BGk8aoxufQpuNYX5byukyoJjdzJvGuMnSTf4r2p6lga',
                    email: 'jane.smith@example.com',
                    floor: 2,
                    room: 10,
                    role: 'user',
                    avatar: ''
                }
            ]
        }
        } */
  }

  // eslint-disable-next-line class-methods-use-this
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findOne({
        where: {
          id,
        },
      });
      if (!user) {
        return res.status(400).json('Такого користувача не існує');
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json('Не вдалось виконати запит, спробуйте пізніше');
    }

    // #swagger.tags = ['Users']
    // #swagger.summary = 'Get a user'
    // #swagger.description = 'Returns a user by user id'
    // #swagger.parameters['id'] = { description: 'User id' }
    /* #swagger.responses[200] = {
            description: 'Successful response',
            schema: {
                id: 5,
                name: 'John',
                surname: 'Doe',
                gender: 'man',
                phone: '0123456789',
                password: '$2b$04$g4415yNFT4BGk8aoxufQpuNYX5byukyoJjdzJvGuMnSTf4r2p6lga',
                email: 'john.doe@example.com',
                floor: 5,
                room: 34,
                role: 'admin',
                avatar: ''
            }
        } */
  }

  // eslint-disable-next-line class-methods-use-this
  async updateUser(req, res) {
    const { error: customError } = UpdateUserValidation(req.body);
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
      let { password, phone } = req.body;
      password = await bcrypt.hash(password, 3);
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
      if (password) {
        updatedFields.password = await bcrypt.hash(password, 3);
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

    // #swagger.tags = ['Users']
    // #swagger.summary = 'Update a user'
    // #swagger.description = 'Updates a user by user id with the provided information'
    /*  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'User object',
                schema: {
                    $name: 'John',
                    surname: 'Doe',
                    gender: 'man',
                    $phone: '0123456789',
                    $password: '123456789f',
                    $repeatPassword: '123456789',
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
                password: '$2b$04$g4415yNFT4BGk8aoxufQpuNYX5byukyoJjdzJvGuMnSTf4r2p6lga',
                email: 'jane.smith@example.com',
                floor: 2,
                room: 10,
                role: 'user',
                avatar: ''
            }
          } */
  }

  // eslint-disable-next-line class-methods-use-this
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findOne({
        where: {
          id,
        },
      });
      if (user) {
        await user.destroy();
        return res.status(200).json('Видалено');
      }
      return res.status(400).json('Такого користувача не існує');
    } catch (error) {
      return res.status(500).json('Не вдалось виконати запит, спробуйте пізніше');
    }

    // #swagger.tags = ['Users']
    // #swagger.summary = 'Delete a user'
    // #swagger.description = 'Deletes a user by user id'
    // #swagger.parameters['id'] = { description: 'User id' }
    // #swagger.responses[200] = { description: 'Successful response' }
  }
}

module.exports = new UserController();
